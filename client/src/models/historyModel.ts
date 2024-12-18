import { Types } from 'mongoose';

export interface HistoryInterfaces {
    userId: Types.ObjectId;
    methodName: string;
    subjectName: string;
    totalStudyTime: number;
    date: string;
}

export class History implements HistoryInterfaces {
    constructor(
        public userId: Types.ObjectId,
        public methodName: string,
        public subjectName: string,
        public totalStudyTime: number,
        public date: string
    ){}
}

