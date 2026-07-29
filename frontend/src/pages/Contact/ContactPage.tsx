import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { postContactMessage } from "../../api/contact";
import { SeoMeta } from "../../components/shared/SeoMeta";
import type { ContactPayload } from "../../types";

const contactSchema: yup.ObjectSchema<ContactPayload> = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name is too short"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
  message: yup
    .string()
    .trim()
    .required("Message is required")
    .min(10, "Message should be at least 10 characters"),
});

export default function ContactPage() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactPayload>({
    resolver: yupResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: postContactMessage,
    onSuccess: () => reset(),
  });

  function onSubmit(values: ContactPayload) {
    mutation.mutate(values);
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 8 } }}>
      <SeoMeta
        title="Contact"
        description="Get in touch — send a message and I'll get back to you."
      />

      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h2">Contact</Typography>
        <Typography variant="body1" color="text.secondary">
          Have a question or want to work together? Send me a message.
        </Typography>
      </Stack>

      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        spacing={3}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="Email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Message"
              multiline
              minRows={5}
              error={Boolean(errors.message)}
              helperText={errors.message?.message}
              fullWidth
            />
          )}
        />

        {mutation.isSuccess ? (
          <Alert severity="success">
            Thanks for reaching out — I'll get back to you soon.
          </Alert>
        ) : null}
        {mutation.isError ? (
          <Alert severity="error">
            Something went wrong sending your message. Please try again.
          </Alert>
        ) : null}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sending…" : "Send message"}
        </Button>
      </Stack>
    </Container>
  );
}
