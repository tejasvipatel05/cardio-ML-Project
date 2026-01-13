import streamlit as st
import numpy as np
import joblib
import json
import plotly.graph_objects as go
from fpdf import FPDF
from datetime import datetime

# ================== PAGE CONFIG ==================
st.set_page_config(
    page_title="Cardio Health Assessment",
    page_icon="❤️",
    layout="wide"
)

# ================== LOAD BEST MODEL ==================
model = joblib.load("cardio_model.pkl")
scaler = joblib.load("scaler.pkl")

with open("model_report.json", "r") as f:
    model_report = json.load(f)

model_accuracies = model_report["models"]
best_model_name = model_report["best_model"]

# ================== SESSION STATE ==================
if "step" not in st.session_state:
    st.session_state.step = 0

if "final_inputs" not in st.session_state:
    st.session_state.final_inputs = None

defaults = {
    "name": "",
    "age": 30,
    "gender": "Female",
    "height": 165,
    "weight": 65,
    "ap_hi": 120,
    "ap_lo": 80,
    "chol": "Normal",
    "gluc": "Normal",
    "smoke": "No",
    "alcohol": "No",
    "active": "Active",
}

for k, v in defaults.items():
    if k not in st.session_state:
        st.session_state[k] = v

# ================== BP VALIDATION ==================
def validate_bp(sys_bp, dia_bp):
    if sys_bp <= dia_bp:
        return False, "Systolic BP must be higher than Diastolic BP."
    if sys_bp < 70 or sys_bp > 250:
        return False, "Systolic BP value looks unrealistic."
    if dia_bp < 40 or dia_bp > 150:
        return False, "Diastolic BP value looks unrealistic."
    return True, ""

# ================== PDF REPORT GENERATION ==================

def generate_pdf_report(data, bmi, risk_percent, probability):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Title
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "Cardiovascular Health Report", ln=True, align="C")
    pdf.ln(5)

    # Patient Summary
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, "Patient Summary", ln=True)

    pdf.set_font("Arial", size=11)
    pdf.cell(0, 8, f"Name: {data.get('name', 'N/A')}", ln=True)
    pdf.cell(0, 8, f"Age: {data['age']} years", ln=True)
    pdf.cell(0, 8, f"BMI: {bmi:.2f}", ln=True)
    pdf.cell(0, 8, f"Blood Pressure: {data['ap_hi']}/{data['ap_lo']} mmHg", ln=True)
    pdf.ln(4)

    # Risk Section
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, "Risk Assessment", ln=True)

    pdf.set_font("Arial", size=11)
    pdf.cell(0, 8, f"Predicted Cardiovascular Risk: {risk_percent:.1f}%", ln=True)

    if risk_percent < 30:
        pdf.cell(0, 8, "Risk Category: LOW", ln=True)
    elif risk_percent < 70:
        pdf.cell(0, 8, "Risk Category: MODERATE", ln=True)
    else:
        pdf.cell(0, 8, "Risk Category: HIGH", ln=True)


    pdf.ln(4)

    # Recommendations
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, "Recommendations", ln=True)

    pdf.set_font("Arial", size=11)
    if risk_percent < 30:
        recs = [
            "Maintain active lifestyle",
            "Follow balanced diet",
            "Annual health screening recommended"
        ]
    elif risk_percent < 70:
        recs = [
            "Increase physical activity",
            "Monitor blood pressure regularly",
            "Adopt preventive lifestyle measures"
        ]
    else:
        recs = [
            "Consult a cardiologist",
            "Monitor blood pressure regularly",
            "Adopt heart-healthy lifestyle changes"
        ]


    for r in recs:
        pdf.cell(0, 8, f"- {r}", ln=True)

    pdf.ln(6)

    # Disclaimer
    pdf.set_font("Arial", "I", 9)
    pdf.multi_cell(
        0, 6,
        "Disclaimer: This report is generated using a machine learning model "
        "and is intended for educational purposes only. It should not be used "
        "as a substitute for professional medical advice."
    )

    # ---------- FIXED FOOTER (SAME PAGE) ----------
    pdf.set_auto_page_break(auto=False)  # 🔑 STOP page breaking

    pdf.set_y(-15)  # 15mm from bottom
    pdf.set_font("Arial", size=9)

    # Left footer: Model Used
    pdf.set_x(10)
    pdf.cell(
        0,
        8,
        f"Model Used: {best_model_name}",
        align="L"
    )

    # Right footer: Generated On
    pdf.set_x(-90)
    pdf.cell(
        80,
        8,
        f"Generated on: {datetime.now().strftime('%d %b %Y, %I:%M %p')}",
        align="R"
    )

    pdf.set_auto_page_break(auto=True, margin=15)  # 🔁 Restore


    return pdf.output(dest="S").encode("latin-1")

# ================== HEADER ==================
st.markdown("""
<div style="margin-top:0px;">
  <h1 style="margin-bottom:0px;">Cardiovascular Health Assessment</h1>
  <p style="color:#6b7280;font-size:15px;">
    ML‑powered system to estimate cardiovascular disease risk
  </p>
</div>
""", unsafe_allow_html=True)

st.divider()
if st.session_state.step > 0:
    st.caption(f"Step {st.session_state.step} of 4")


# ================== DASHBOARD PAGE ==================
if st.session_state.step == 0:

    st.subheader("📊 Model Performance Dashboard")

    st.caption(
        "This system evaluates multiple machine learning models and "
        "automatically selects the best performing model based on accuracy."
    )

    # ---- MODEL ACCURACY CARDS ----
    cols = st.columns(len(model_accuracies))

    for col, (model_name, acc) in zip(cols, model_accuracies.items()):
        with col:
            st.metric(
                label=model_name,
                value=f"{acc*100:.2f}%"
            )
            if model_name == best_model_name:
                st.success("⭐ Selected Model")

    st.divider()

    # ---- ACCURACY COMPARISON GRAPH ----
    st.markdown("### 📈 Accuracy Comparison")

    st.bar_chart(
        {k: v * 100 for k, v in model_accuracies.items()}
    )

    st.divider()

    # ---- CTA BUTTON ----
    if st.button("🩺 Start Health Assessment"):
        st.session_state.step = 1
        st.rerun()


# ================== STEP 1 ==================
if st.session_state.step == 1:
    st.subheader("👤 Patient Information")

    st.session_state.name = st.text_input(
                "Full Name",
                value=st.session_state.name,
                placeholder="Enter patient's full name"
    )
    name_valid = bool(st.session_state.name.strip())
    c1, c2 = st.columns(2)
    with c1:
        st.session_state.age = st.slider("Age (Years)", 20, 90, st.session_state.age)

        st.session_state.gender = st.selectbox(
            "Gender", ["Female", "Male"],
            index=["Female", "Male"].index(st.session_state.gender)
        )
    with c2:
        st.session_state.height = st.number_input("Height (cm)", 140, 210, st.session_state.height)
        st.session_state.weight = st.number_input("Weight (kg)", 40, 200, st.session_state.weight)

    if st.button("Next →"):
        if not name_valid:
            st.warning("⚠️ Please enter patient's full name before proceeding.")
        else:
            st.session_state.step = 2
            st.rerun()

# ================== STEP 2 ==================
elif st.session_state.step == 2:
    st.subheader("🩺 Clinical Vitals")
    st.info("Blood pressure format: **Systolic / Diastolic** (e.g. 120 / 80 mmHg)")

    c1, c2 = st.columns(2)
    with c1:
        st.session_state.ap_hi = st.number_input("Systolic BP", 70, 250, st.session_state.ap_hi)
        st.session_state.ap_lo = st.number_input("Diastolic BP", 40, 150, st.session_state.ap_lo)

    with c2:
        st.session_state.chol = st.selectbox(
            "Cholesterol Level",
            ["Normal", "Above Normal", "Well Above Normal"],
            index=["Normal", "Above Normal", "Well Above Normal"].index(st.session_state.chol)
        )
        st.session_state.gluc = st.selectbox(
            "Glucose Level",
            ["Normal", "Above Normal", "Well Above Normal"],
            index=["Normal", "Above Normal", "Well Above Normal"].index(st.session_state.gluc)
        )

    valid, err = validate_bp(st.session_state.ap_hi, st.session_state.ap_lo)
    if not valid:
        st.warning(err)

    b1, b2 = st.columns(2)
    with b1:
        if st.button("← Back"):
            st.session_state.step = 1
            st.rerun()
    with b2:
        if st.button("Next →") and valid:
            st.session_state.step = 3
            st.rerun()

# ================== STEP 3 ==================
elif st.session_state.step == 3:
    st.subheader("🏃 Lifestyle Factors")

    c1, c2 = st.columns(2)
    with c1:
        st.session_state.smoke = st.selectbox(
            "Smoking", ["No", "Yes"],
            index=["No", "Yes"].index(st.session_state.smoke)
        )
    with c2:   
        st.session_state.alcohol = st.selectbox(
            "Alcohol Consumption", ["No", "Yes"],
            index=["No", "Yes"].index(st.session_state.alcohol)
        )
    
    st.session_state.active = st.selectbox(
        "Physical Activity", ["Inactive", "Active"],
        index=["Inactive", "Active"].index(st.session_state.active)
    )

    b1, b2 = st.columns(2)
    with b1:
        if st.button("← Back"):
            st.session_state.step = 2
            st.rerun()
    with b2:
        if st.button("Generate Health Report"):
            st.session_state.final_inputs = {
                "name": st.session_state.name,
                "age": st.session_state.age,
                "height": st.session_state.height,
                "weight": st.session_state.weight,
                "ap_hi": st.session_state.ap_hi,
                "ap_lo": st.session_state.ap_lo,
                "chol": st.session_state.chol,
                "gluc": st.session_state.gluc,
            }
            st.session_state.step = 4
            st.rerun()

# ================== STEP 4 (MODERN REPORT) ==================
elif st.session_state.step == 4 and st.session_state.final_inputs:
    data = st.session_state.final_inputs

    patient_name = data.get("name", "").strip()

    bmi = data["weight"] / ((data["height"] / 100) ** 2)

    gender_val = 1 if st.session_state.gender == "Male" else 0
    smoke_val = 1 if st.session_state.smoke == "Yes" else 0
    alco_val = 1 if st.session_state.alcohol == "Yes" else 0
    active_val = 1 if st.session_state.active == "Active" else 0

    chol_map = {"Normal": 1, "Above Normal": 2, "Well Above Normal": 3}
    gluc_map = {"Normal": 1, "Above Normal": 2, "Well Above Normal": 3}

    input_data = np.array([[
        data["age"],
        gender_val,
        data["ap_hi"],
        data["ap_lo"],
        chol_map[data["chol"]],
        gluc_map[data["gluc"]],
        smoke_val,
        alco_val,
        active_val,
        bmi
    ]])

    input_scaled = scaler.transform(input_data)
    probability = model.predict_proba(input_scaled)[0][1]
    risk_percent = float(np.clip(probability * 100, 0, 100))

    # -------- RISK LEVEL CLASSIFICATION --------
    if risk_percent < 30:
        risk_level = "LOW"
        recs = [
            "Maintain active lifestyle",
            "Balanced diet",
            "Annual health screening"
        ]
    elif risk_percent < 70:
        risk_level = "MODERATE"
        recs = [
            "Improve diet & physical activity",
            "Regular BP & glucose monitoring",
            "Preventive medical consultation"
        ]
    else:
        risk_level = "HIGH"
        recs = [
            "Consult a cardiologist",
            "Monitor BP & cholesterol",
            "Immediate lifestyle modifications"
        ]

    st.subheader("📄 Cardiovascular Health Report")

    if data.get("name"):
        st.caption(f"Patient Name: **{data['name']}**")

    # -------- SUMMARY CARDS --------
    m1, m2, m3 = st.columns(3)
    m1.metric("Age", f"{data['age']} yrs")
    m2.metric("BMI", f"{bmi:.2f}")
    m3.metric("Blood Pressure", f"{data['ap_hi']}/{data['ap_lo']}")

    st.divider()

    # -------- MODERN DONUT GAUGE --------
    fig = go.Figure(go.Pie(
        values=[risk_percent, 100 - risk_percent],
        hole=0.75,
        marker=dict(colors=[
            "#22c55e" if risk_level == "LOW" else
            "#f59e0b" if risk_level == "MODERATE" else
            "#ef4444",
            "#e5e7eb"
        ]),

        textinfo="none"
    ))

    fig.update_layout(
        showlegend=False,
        annotations=[dict(
            text=f"<b>{risk_percent:.1f}%</b><br>Risk",
            x=0.5, y=0.5,
            font_size=22,
            showarrow=False
        )],
        height=320,
        margin=dict(t=20, b=20, l=20, r=20)
    )

    c1, c2 = st.columns([1, 1])
    with c1:
        st.plotly_chart(fig, use_container_width=True)

    with c2:
        # ---- Risk Message ----
        if risk_level == "HIGH":
            st.error("🔴 **High Cardiovascular Risk Detected**")
        elif risk_level == "MODERATE":
            st.warning("🟡 **Moderate Cardiovascular Risk Detected**")
        else:
            st.success("🟢 **Low Cardiovascular Risk Detected**")

        # ---- Dynamic Recommendations ----
        st.markdown("**Recommended Actions**")

        for r in recs:
            st.markdown(f"- {r}")


    st.info("⚠️ This report is generated using a machine learning model and is for educational purposes only.")

    st.divider()
    st.subheader("🧠 Model Performance & Selection")

    st.caption(
        "Multiple machine learning models were trained and evaluated. "
        "The best performing model was automatically selected based on accuracy."
    )

    # -------- DOWNLOAD PDF REPORT --------
    pdf_bytes = generate_pdf_report(
        data=data,
        bmi=bmi,
        risk_percent=risk_percent,
        probability=probability
    )

    if patient_name:
        safe_name = patient_name.replace(" ", "_")
        pdf_filename = f"{safe_name} Cardiovascular Health Report.pdf"
    else:
        pdf_filename = "Cardiovascular Health Report.pdf"

    st.download_button(
        label="📄 Download PDF Report",
        data=pdf_bytes,
        file_name=pdf_filename,
        mime="application/pdf"
    )

    if st.button("← Edit Information"):
        st.session_state.step = 1
        st.session_state.final_inputs = None
        st.rerun()

# ================== FOOTER ==================
st.markdown("""
<hr>
<p style="text-align:center;color:#6b7280;font-size:13px; margin-bottom:0px;">
© 2026 | ML‑Powered Digital Health Assessment System
</p>
""", unsafe_allow_html=True)
