import HomeCard from "@/src/components/ui/cards/HomeCard.ui"

export default function CardWrapper() {
  return (
    <div className="mt-16">

      <div className="flex justify-between text-2xl">
        <h3 className="text-gray-600 font-medium">Recém Publicados</h3>
        <p className="uppercase font-bold text-terciary-blue items-center">HOJE! <span className="bg-terciary-blue py-2 px-3 md:px-5 rounded-r-2xl ml-2 lg:ml-4" /></p>
      </div>
      <div className="flex flex-row overflow-x-scroll no-scrollbar gap-6 mt-6 px-2">

        <HomeCard price={34.000} title="Casa a venda, urgente, compra fácil e fianciado" cardUrl="#" address={{ city: "Salvador", locality: "Amaralina" }} brand={{ icon: "/miscellaneous/descont-icon.svg", label: "Desconto" }} cardImage="https://cdn.pixabay.com/photo/2017/06/19/04/06/house-2418106_960_720.jpg" user={{ avatar: "https://lh3.googleusercontent.com/a/ACg8ocIjHYh74asjlJ31qm1FjRbMrcEEfcLknQxCfT0GxXgcKoi7oWel=s96-c", name: "Paulo Henrique Moreira Rosado" }} />
        <HomeCard price={34.000} title="Casa a venda, urgente, compra fácil e fianciado" cardUrl="#" address={{ city: "Salvador", locality: "Amaralina" }} brand={{ icon: "/miscellaneous/descont-icon.svg", label: "Desconto" }} cardImage="https://cdn.pixabay.com/photo/2017/06/19/04/06/house-2418106_960_720.jpg" user={{ avatar: "https://lh3.googleusercontent.com/a/ACg8ocIjHYh74asjlJ31qm1FjRbMrcEEfcLknQxCfT0GxXgcKoi7oWel=s96-c", name: "Paulo Henrique Moreira Rosado" }} />
        <HomeCard price={34.000} title="Casa a venda, urgente, compra fácil e fianciado" cardUrl="#" address={{ city: "Salvador", locality: "Amaralina" }} brand={{ icon: "/miscellaneous/descont-icon.svg", label: "Desconto" }} cardImage="https://cdn.pixabay.com/photo/2017/06/19/04/06/house-2418106_960_720.jpg" user={{ avatar: "https://lh3.googleusercontent.com/a/ACg8ocIjHYh74asjlJ31qm1FjRbMrcEEfcLknQxCfT0GxXgcKoi7oWel=s96-c", name: "Paulo Henrique Moreira Rosado" }} />
        <HomeCard price={34.000} title="Casa a venda, urgente, compra fácil e fianciado" cardUrl="#" address={{ city: "Salvador", locality: "Amaralina" }} brand={{ icon: "/miscellaneous/descont-icon.svg", label: "Desconto" }} cardImage="https://cdn.pixabay.com/photo/2017/06/19/04/06/house-2418106_960_720.jpg" user={{ avatar: "https://lh3.googleusercontent.com/a/ACg8ocIjHYh74asjlJ31qm1FjRbMrcEEfcLknQxCfT0GxXgcKoi7oWel=s96-c", name: "Paulo Henrique Moreira Rosado" }} />
        <HomeCard price={34.000} title="Casa a venda, urgente, compra fácil e fianciado" cardUrl="#" address={{ city: "Salvador", locality: "Amaralina" }} brand={{ icon: "/miscellaneous/descont-icon.svg", label: "Desconto" }} cardImage="https://cdn.pixabay.com/photo/2017/06/19/04/06/house-2418106_960_720.jpg" user={{ avatar: "https://lh3.googleusercontent.com/a/ACg8ocIjHYh74asjlJ31qm1FjRbMrcEEfcLknQxCfT0GxXgcKoi7oWel=s96-c", name: "Paulo Henrique Moreira Rosado" }} />
      </div>
    </div>
  )
}
