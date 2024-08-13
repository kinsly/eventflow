export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    roles:Role[];
    businesses?:Business[];
}

export interface Role{
    created_at:string,
    guard_name:string,
    id:string,
    name:string,
    updated_at:string
}

export interface EventYear{
    year:string,
    user_id:string,
    months:EventMonth[]
}

export interface EventMonth{
    month:string,
    event_date_id:string,
    days:EventDate[],
    year:EventYear
}

export interface EventDate{
    date:string,
    event_month_id:string,
    events:Event[],
    month:EventMonth
}

export interface Event{
    id:string,
    name:string,
    description:string,
    start_time:string,
    end_time:string,
    all_day:boolean,
    event_date_id:string,
    day:EventDate,
    completed:boolean,
    cost?:number,
    telephone_1?:string,
    telephone_2?:string
    payments?:EventPayment[]

        
}

export interface EventPayment
{
    id:string;
    event_id:string;
    deposit:number;
    date:string;
    key?:string|number;
}

interface FormDatapayment
{
    deposit:number|undefined;
    date:string|null;
}


export interface EventFormData {
    name: string;
    description: string| null;
    date: string | null;
    start_time: string | null;
    end_time: string | null;
    all_day: boolean;
    telephone_1:string;
    telephone_2:string;
    cost:number|null;
    business_id?:string|null;
    payments: EventPayment[];    
  }

export interface Business{
    id:string,
    name:string;
    role:string;
    users?:User[];
}  

export type CustomFormData<T> = {
    [K in keyof T]: any;
};

export type Session = {
    selected_business:number,
    selected_year:number    
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash:{
        success_message:string
    }
    errors:any,
    session:Session
};
