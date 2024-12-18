import mongoose, { Schema, Document, Types } from 'mongoose';

interface HistoryInterface extends Document {
    userId: Types.ObjectId;
    methodName: string;
    subjectName: string;
    totalStudyTime: number;
    date: Date;
}


const HistorySchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    methodName: {
        type: String,
        required: true,
    },
    subjectName: {
        type: String,
        required: true,
    },
    totalStudyTime: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

HistorySchema.index({ date: 1, userId: 1, methodId: 1, subjectId: 1 }, { unique: true });

const History = mongoose.model<HistoryInterface>('History', HistorySchema);

export default History;

/**
 * 
 * import mongoose, { Schema, Document, Types } from 'mongoose';

interface HistoryInterface extends Document {
    userId: Types.ObjectId;
    methodId: Types.ObjectId;
    subjectId: Types.ObjectId;
    totalStudyTime: number;
    date: Date;
}


const HistorySchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    methodId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'StudyMethodModel'
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Subject'
    },
    totalStudyTime: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

HistorySchema.index({ date: 1, userId: 1, methodId: 1, subjectId: 1 }, { unique: true });

const History = mongoose.model<HistoryInterface>('History', HistorySchema);

export default History;
 * 
 */