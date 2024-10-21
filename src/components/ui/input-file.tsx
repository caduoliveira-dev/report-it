import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
      <Label htmlFor="picture">Arquivo</Label>
      <Input id="picture" type="file" />
    </div>
  )
}
