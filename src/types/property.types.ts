export interface AdminInfo {
    id: number;
    name: string;
    email: string;
    
    role: string; 
    

    isSuperAdmin: boolean; 
    
    createdAt: string; 
}

export interface PropertyDto {
    id: number;
    title: string;
    description: string;
    price: number; 
    location: string;
    imageUrls: string[]; 
    
    admin: AdminInfo | null; 
    }

