import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
    imageName: {
        type: String,
        required: true
    },
    predictionLabel: {
        type: String,
        required: true
    },
    predictionIndex: {
        type: Number,
        required: true
    },
    confidence: {
        type: Number,
        required: true
    },
    probabilities: {
        type: Map,
        of: Number // Stochează dicționarul de probabilități per clasă
    },
    heatmapBase64: {
        type: String, // Harta GradCAM generată inițial de AI
        required: true
    },
    originalImageBase64: {
        type: String, // Imaginea brută inițială încărcată de pacient (RĂMÂNE CURATĂ MEREU)
        required: true
    },
    // NOUA PROPRIETATE ADĂUGATĂ PENTRU MEDICI:
    annotatedImageBase64: {
        type: String, // Stochează imaginea originală modificată cu desenele medicului din Canvas
        default: ""
    },
    doctorObservations: {
        type: String,
        default: ""
    },
    isReviewed: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        default: 45 // Poți seta o vârstă implicită sau să o lași fără default
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'M', 'F'], // adaugă formatele tale
        required: true
    },
    patientName: { type: String, default: "Anonymous Patient" },
    fidelityScore: {
        type: Number,
        default: 0.0
    },
    stabilityScore: {
        type: Number,
        default: 0.0
    },
    humanAgreementScore: {
        type: Number,
        default: 0.0
    },
    deletionAuc: {
        type: Number,
        default: 0.0
    },
    insertionAuc: {
        type: Number,
        default: 0.0
    }
}, {
    timestamps: true // Adaugă automat proprietățile createdAt și updatedAt
});

const Analysis = mongoose.model('Analysis', analysisSchema);
export default Analysis;