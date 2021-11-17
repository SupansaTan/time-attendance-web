export class PlanShiftModel {
    date: string;
    dep_code: string;
    emp: number;
    start_time: string;
    end_time: string;
    overtime: number;
}

export class ShiftCodeModel {
    code: string;
    start_time: string;
    end_time: string;
    start_break: string;
    end_break: string;
}