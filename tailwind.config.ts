import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/blocks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/swiper/**/*.js",
  ],
  darkMode: ["class"],
  theme: {
    fontSize: {
      inherit: "inherit",
    },
    extend: {
      container: {
        center: true,
      },
      backgroundImage: {
        "fade-to-secondary":
          "linear-gradient(180deg, white 60%, hsl(var(--secondary)) 60%)",
      },
      fontSize: {
        "heading-1": [
          "4rem",
          {
            lineHeight: "4rem",
            fontWeight: "700",
          },
        ],
        "heading-2": [
          "3rem",
          {
            lineHeight: "3.5rem",
            fontWeight: "700",
          },
        ],
        "heading-3": [
          "2.375rem",
          {
            lineHeight: "3rem",
            fontWeight: "700",
          },
        ],
        "heading-4": [
          "1.78rem",
          {
            fontWeight: "600",
            lineHeight: "2.125rem",
          },
        ],
        "heading-5": [
          "1.33rem",
          {
            fontWeight: "500",
          },
        ],
        base: [
          "1.125rem",
          {
            lineHeight: "1.8rem",
            fontWeight: "400",
          },
        ],
        caption: [
          "1.125rem",
          {
            lineHeight: "1.375rem",
            fontWeight: 500,
          },
        ],
        badge: ["0.875rem", { fontWeight: 500 }],
      },
      fontFamily: {
        sans: ["var(--font-gilroy)"],
      },
      //   typography: {
      //     DEFAULT: {
      //       css: {
      //         "--tw-prose-body": "hsl(var(--foreground))",
      //         maxWidth: "90ch",
      //         "h2,h3,h4,h5": {
      //           fontWeight: "400",
      //           lineHeight: "1.1",
      //         },
      //         h2: {
      //           fontSize: "2.25rem",
      //         },
      //         h3: {
      //           fontSize: "1.75rem",
      //         },
      //         h4: {
      //           fontSize: "1.5rem",
      //         },
      //       },
      //     },
      //     lg: {
      //       css: {
      //         h2: {
      //           fontSize: "3rem",
      //         },
      //         h3: {
      //           fontSize: "2.25rem",
      //         },
      //         h4: {
      //           fontSize: "1.75rem",
      //         },
      //       },
      //     },
      //   },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    keyframes: {
      "collapsible-down": {
        from: {
          height: "0",
        },
        to: {
          height: "var(--radix-collapsible-content-height)",
        },
      },
      "collapsible-up": {
        from: {
          height: "var(--radix-collapsible-content-height)",
        },
        to: {
          height: "0",
        },
      },
    },
    animation: {
      "collapsible-down": "collapsible-down 0.2s ease-out",
      "collapsible-up": "collapsible-up 0.2s ease-out",
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config
