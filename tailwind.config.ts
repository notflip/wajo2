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
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)"],
        sans: ["var(--font-switzer)"],
      },
      fontSize: {
        xs: ["0.75rem", "1.75"],
        base: ["1rem", "1.75"],
        lg: ["1.125rem", "1.5"],
        "2xl": "1.5rem",
        "3xl": ["1.75rem", "1.1"],
        "4xl": ["2.25rem", "1.1"],
        "5xl": "3rem",
        "6xl": "3.5rem",
        "7xl": "4rem",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            maxWidth: "90ch",
            "h2,h3,h4,h5": {
              fontWeight: "400",
              lineHeight: "1.1",
            },
            h2: {
              fontSize: "2.25rem",
            },
            h3: {
              fontSize: "1.75rem",
            },
            h4: {
              fontSize: "1.5rem",
            },
          },
        },
        lg: {
          css: {
            h2: {
              fontSize: "3rem",
            },
            h3: {
              fontSize: "2.25rem",
            },
            h4: {
              fontSize: "1.75rem",
            },
          },
        },
      },
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
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: "hsl(var(--tertiary))",
        "brand-yellow": "hsl(var(--brand-yellow))",
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
