import { Input } from "@/components/atoms/Input"

export function Search() {
  return (
    <div>
      <Input type="search" placeholder="Search..." className="h-9 md:w-[100px] lg:w-[300px]" />
    </div>
  )
}
