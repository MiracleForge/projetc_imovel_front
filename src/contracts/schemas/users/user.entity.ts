import { z } from "zod"

export const cpfCnpjSchema = z.string().refine(
  (value) => {
    if (value.length === 11) return /^\d{11}$/.test(value); // CPF
    if (value.length === 14) return /^\d{14}$/.test(value); // CNPJ
    return false;
  },
  {
    message: "Número de documento inválido. Deve ser um CPF ou CNPJ válido.",
  },
);

export const userPasswordSchema = z
  .string()
  .min(8)
  .superRefine((password, checkPassComplexity) => {
    const conteinUpperCaseRegex = (ch: string) => /[A-Z]/.test(ch);
    const conteinLowerCaseRegex = (ch: string) => /[a-z]/.test(ch);
    const containSpecialCharacteRegex = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countUpperCase = 0,
      countLowerCase = 0,
      countNumber = 0,
      countSpecial = 0;
    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (!isNaN(+ch)) countNumber++;
      else if (conteinUpperCaseRegex(ch)) countUpperCase++;
      else if (conteinLowerCaseRegex(ch)) countLowerCase++;
      else if (containSpecialCharacteRegex(ch)) countSpecial++;
    }
    if (
      countLowerCase < 1 ||
      countUpperCase < 1 ||
      countSpecial < 1 ||
      countNumber < 1
    ) {
      checkPassComplexity.addIssue({
        code: "custom",
        message:
          "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
      });
    }
  });

export const userAddressSchema = z.object({
  city: z
    .string()
    .trim()
    .min(1, "Cidade não pode ser vazia")
    .describe("City of the address"),
  address: z
    .string()
    .trim()
    .min(1, "Estado não pode ser vazio")
    .describe("State of the address"),
  state: z
    .string()
    .trim()
    .min(1, "Estado não pode ser vazio")
    .describe("Number of the address"),
});


// User Role Enum Schema
export const userRoleEnum = z.enum(["user", "admin", "moderador", "support"]);

// User Plan Enum Schema
export const userPlanEnum = z.enum(["free", "premium", "business"]).nullable();

// Main User Entity Schema
export const userEntitySchema = z.object({
  // Identification
  id: z.uuid().describe("User UUID"),
  email: z.email().trim().toLowerCase().describe("User email"),
  password: userPasswordSchema.describe("Password with security rules"),

  // Personal Information
  name: z
    .string()
    .trim()
    .min(1, "O campo Nome não pode estar vazio")
    .max(100)
    .describe("User's first name"),
  surname: z
    .string()
    .trim()
    .min(1, "O campo Sobrenome não pode estar vazio")
    .max(100)
    .describe("User's last name"),
  bio: z
    .string()
    .trim()
    .max(500)
    .nullable()
    .optional()
    .describe("User biography"),
  birthdate: z.coerce.date().describe("Date of birth"),
  avatar_url: z.url().nullable().optional().describe("Avatar URL"),

  // Contact Information
  phone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, "Telefone inválido")
    .describe("User phone number (international format)"),

  // Address
  address: userAddressSchema.describe("User full address"),

  // Roles and Plans
  role: userRoleEnum.describe("User access role"),
  plan: userPlanEnum.describe("User current plan"),
  is_juridic: z.boolean().default(false)
    .describe("Document type (CPF or CNPJ)"),
  document_number: cpfCnpjSchema.describe("Número do CPF ou CNPJ"),

  // Status Flags
  is_verified: z
    .boolean()
    .default(false)
    .describe("Indicates if user's email is verified"),
  is_active: z.boolean().describe("Indicates if the user is active"),
  is_deleted: z.boolean().describe("Indicates if the user is soft deleted"),
  failed_attempts: z.number().describe("Failed login attempts"),
  lock_until: z.date().nullable().describe("Date until the user is locked"),

  accepts_emails_promotions: z.boolean().describe("Accepts promotional emails"),
  cookies_allowed: z.boolean().describe("Allows cookie usage"),

  // Timestamps
  created_at: z
    .date()
    .default(() => new Date())
    .describe("Record creation date"),
  last_login: z.date().optional().describe("Last user login"),
  deleted_at: z.date().optional().nullable().describe("Soft deletion date"),
});

