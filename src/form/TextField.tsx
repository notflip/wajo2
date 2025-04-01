import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const TextField = ({ name, label, defaultValue, control }: any) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={defaultValue} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
