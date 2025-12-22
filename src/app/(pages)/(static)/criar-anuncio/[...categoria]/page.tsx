import { adversetimentCategoriesData } from "@/src/data/global.constants";

export default function Page() {
  return (
    <div className="">
      <label className="text-3xl leading-6 tracking-tighter">Escolha sua categoria</label>
      <select>
        <option value="">--- Escolha a categoria do anúncio ---</option>

        {adversetimentCategoriesData.map((categoria, index) => (
          <option className="capitalize" key={index} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  )
}
