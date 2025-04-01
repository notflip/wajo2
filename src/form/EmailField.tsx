import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

/**
 * Email field that uses validation from zod
 */
export const EmailField = ({ name, label, defaultValue, control }: any) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
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
