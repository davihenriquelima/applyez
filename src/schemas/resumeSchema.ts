import { z } from 'zod';

export const resumeSchema = z.object({
    name: z.string({required_error:"name is required"}).min(2, "enter at least 2 characters").trim(),
    birthDate: z.string({required_error:"insert your birth date"}),
    gender: z.string().min(1,"select a valid option"),
    maritalStatus: z.string({required_error:"insert your marital status"}),
    dependents: z.array(z.object({
        response: z.string().min(1,"select a valid option"),
        quantity: z.number().optional()
    })),
    cpf: z.string({required_error:"insert your cpf"}).transform((value) => value.replace(/\D/g, '')),
    email: z.string({required_error:"email is required"}).email("enter a valid email").trim().transform(value => value.toLowerCase()),
    phone: z.string({required_error:"phone is required"}).transform((value) => value.replace(/\D/g, '')),
    address: z.string({required_error:"address is required"}).trim(),
    addressNumber: z.number({required_error:"number is required"}),
    zipCode: z.string().trim().transform(value => value.replace(/\D/g, '')).optional(),
    city: z.string({required_error:"city is required"}).trim(),
    state: z.string({required_error:"state is required"}).trim(),
    country: z.string({required_error:"country is required"}).trim(),
    role: z.string({required_error:"role is required"}).trim(),
    workingDay: z.string({required_error:"role is required"}).trim().transform(value => value.toLowerCase()),
    skills: z.array(z.string()).optional(),
    languages: z.array(z.object({ 
        language: z.string(),
        proficiency: z.string()
    })).optional(),
    education: z.array(z.object({
        institution: z.string(),
        degree: z.string(),
        startDate: z.string(),
        endDate: z.string().optional()
    })).optional(),
    experience: z.array(z.object({
        company: z.string(),
        role: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        responsibilities: z.string().optional()
    })).optional(),
    certifications: z.array(z.object({
        name: z.string(),
        issuingOrganization: z.string(),
        issueDate: z.string(),
        expirationDate: z.string().optional()
    })).optional(),
    portfolioLinks: z.array(z.string().url()).optional(),
    socialLinks: z.array(z.object({
        linkedin: z.string().url().optional(),
        github: z.string().url().optional(),
        portfolio: z.string().url().optional(),
        instagram:z.string().url().optional(),
        facebook:z.string().url().optional(),
        tiktok:z.string().url().optional()
    })).optional(),
    curriculum: z
        .instanceof(FileList)
        .refine(files => files.length > 0, "please select a file")
        .transform(files => files[0])
        .refine(file => file instanceof File, "input must be a File")
        .refine(file => file.type === "application/pdf", "only PDF files are allowed")
        .refine(file => file.size < 2 * 1024 * 1024, "file size must be less than 2MB"),
});

export type FormData = z.infer<typeof resumeSchema>;