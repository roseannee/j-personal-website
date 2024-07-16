import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface LinearLoginCodeEmailProps {
  url: string
}

export const MagicLinkEmail = ({ url }: LinearLoginCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your login code for j-personal-website</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://media4.giphy.com/media/8053uNNcDLNELxDEhY/giphy.gif?cid=6c09b9525yrjtq67174z7i80hol5m18rv6fs31rly4rpywie&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
          width="56"
          height="56"
          alt="logo"
          style={logo}
        />
        <Heading style={heading}>
          Your login code for j-personal-website
        </Heading>
        <Section style={buttonContainer}>
          <Button style={button} href={url}>
            Login
          </Button>
        </Section>
        <Text style={paragraph}>
          This link will only be valid for the next 5 minutes.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const logo = {
  borderRadius: 21,
  width: 56,
  height: 56,
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
}

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
}

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
}

const buttonContainer = {
  padding: "27px 0 27px",
}

const button = {
  backgroundColor: "#5e6ad2",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
}
