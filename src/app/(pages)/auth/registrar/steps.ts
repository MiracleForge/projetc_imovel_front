export const registerSteps = [
  {
    title: "Informações pessoais",
    fields: [
      { topLabel: "Nome Completo", type: "text", name: "fullName", required: true, placeholder: "Nome" },
      { topLabel: "Email", type: "email", name: "email", required: true, placeholder: "exemplo@email.com" },
      { topLabel: "Data de Nascimento", type: "date", name: "birthDate", required: true },
      // { topLabel: "Telefone", type: "tel", name: "phone", required: true, placeHolder: "(71)  98447-4664" },
    ]
  },
  {
    title: "Segurança",
    fields: [
      { topLabel: "Senha", type: "password", name: "password", required: true, placeholder: "" },
      { topLabel: "Confirmar Senha", type: "password", name: "confirmPassword", required: true, placeholder: "" },
      { topLabel: "CPF", type: "text", name: "cpf", required: true, placeholder: "000.000.000-00" },
    ]
  },
  {
    title: "Endereço",
    fields: [
      { topLabel: "Endereço", type: "text", name: "address", required: true, placeholder: "" },
      { topLabel: "Cidade", type: "text", name: "city", required: true, placeholder: "" },
      { topLabel: "Estado", type: "text", name: "state", required: true, placeholder: "" },
    ]
  }
];

