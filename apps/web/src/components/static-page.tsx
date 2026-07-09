import { Container, Stack, Typography } from "@mui/material";

type StaticPageProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
};

export function StaticPage({ eyebrow, title, lead, children }: StaticPageProps) {
  return (
    <Container component="article" maxWidth="md" sx={{ py: { xs: 7, md: 10 } }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography component="h1" variant="h1" sx={{ maxWidth: 760 }}>
        {title}
      </Typography>
      {lead ? (
        <Typography color="text.secondary" sx={{ fontSize: "1.15rem", mt: 2.5, maxWidth: 760 }}>
          {lead}
        </Typography>
      ) : null}
      <Stack spacing={5} sx={{ mt: 6 }}>
        {children}
      </Stack>
    </Container>
  );
}

export function Eyebrow({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Typography component="p" variant="overline" sx={{ display: "block", mb: 1.5 }}>
      {children}
    </Typography>
  );
}
