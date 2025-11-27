export const registerSteps = [
  {
    title: "Informações pessoais",
    fields: [
      { topLabel: "Nome Completo", type: "text", name: "name", required: true, placeholder: "Nome" },
      { topLabel: "Sobrenome", type: "text", name: "surname", required: true, placeholder: "Sobrenome" },
      { topLabel: "Número documento", type: "text", name: "document_number", required: true, placeholder: "000.000.000-00 ou 00.000.000/0001-00" },
      { topLabel: "Pessoa Juridica", type: "checkbox", name: "is_juridic", required: false, placeholder: "", defaultChecked: false },
    ]
  },
  {
    title: "Contato e Identificação",
    fields: [
      { topLabel: "Email", type: "email", name: "email", required: true, placeholder: "exemplo@email.com" },
      { topLabel: "Data de Nascimento", type: "date", name: "birthdate", required: true },
      { topLabel: "Telefone", type: "tel", name: "phone", required: true, placeholder: "(71)  98447-4664" },
    ]
  },
  {
    title: "Segurança",
    fields: [
      { topLabel: "Senha", type: "password", name: "password", required: true, placeholder: "" },
      { topLabel: "Confirmar Senha", type: "password", name: "confirmPassword", required: true, placeholder: "" },
      { topLabel: "Pergunta de segurança", type: "text", name: "questionSecurity", required: true, placeholder: "" },
    ]
  },
  {
    title: "Endereço",
    fields: [
      { topLabel: "Endereço", type: "text", name: "address.address", required: true, placeholder: "" },
      { topLabel: "Cidade", type: "text", name: "address.city", required: true, placeholder: "" },
      { topLabel: "Estado", type: "text", name: "address.state", required: true, placeholder: "" },
    ]
  },
  {
    title: "Privacidade",
    fields: [
      { topLabel: "Deseja Receber Emails Promocionais", type: "checkbox", name: "accepts_emails_promotions", required: false, placeholder: "" },
      { topLabel: "Aceitar Cookies", type: "checkbox", name: "cookies_allowed", required: false, placeholder: "" },
    ]
  }
];
