export class PlanShiftModel {
    id:number;
    date: string;
    department: any;
    employee: any;
    start_time: string;
    end_time: string;
    overtime: number;
}

export class ShiftCodeModel {
    id:number;
    code: string;
    start_time: string;
    end_time: string;
    start_break: string;
    end_break: string;
}