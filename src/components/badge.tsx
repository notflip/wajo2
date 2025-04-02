type BadgeProps = {
  text: string
}

export default function Badge({ text }: BadgeProps) {
  return (
    <div className="inline-flex gap-2 items-center px-2 py-1 rounded-full text-badge uppercase border border-foreground/20">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7C5.17867 7 7 5.242 7 1C7 5.242 8.80867 7 13 7C8.80867 7 7 8.80867 7 13C7 8.80867 5.17867 7 1 7Z"
          fill="#010614"
          stroke="#010614"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <div>{text}</div>
    </div>
  )
}
