import * as React from "react"
import { render } from "@react-email/render"
import { Submission } from "@payload-types"

import {
  Body,
  Container,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface Props {
  doc: Submission
}

export const RenderedEmail = async (data: Props) => {
  return await render(<Email {...data} />)
}

export const Email = ({ doc }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  return (
    <Html>
      <Tailwind>
        <Body style={main}>
          <Img
            src={`${baseUrl}/logo-wajo.png`}
            width="50"
            className="mx-auto mt-8"
          />
          <Container style={container}>
            <Heading className="text-center">{doc.form}</Heading>
            <Section className="bg-slate-100 p-4 rounded">
              {Object.entries(doc.data || {}).map(([key, value]) => (
                <Text key={key} className="text-base">
                  <span className="font-bold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <br />
                  {String(value)}
                </Text>
              ))}
              <Text className="text-base">
                <span className="font-bold">Aangevraagd op</span>
                <br />
                {doc.createdAt}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

Email.PreviewProps = {
  doc: {
    id: 1,
    form: "Test Form",
    data: {
      name: "tester",
      email: "test@test.be",
      phone: "04893234",
      accept: true,
      message: "tester",
    },
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
} as Props

const main = {
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
}
