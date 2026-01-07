import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        index: true
    },
    actorId: {
        type: String,
        required: true,
        index: true
    },
    targetId: {
        type: String,
        index: true
    },
    metadata: {
        type: Object,
        default: {}
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
}, { minimize: false });

// Create compound index for efficient querying
auditLogSchema.index({ action: 1, timestamp: -1 });
auditLogSchema.index({ actorId: 1, timestamp: -1 });

const AuditLog = mongoose.models.auditlog || mongoose.model('auditlog', auditLogSchema);

export default AuditLog;
