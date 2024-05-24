"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, PlusIcon } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
});

export default function UploadButton() {
  const { toast } = useToast();
  const organization = useOrganization();
  const createFile = useMutation(api.files.createFile);
  const user = useUser();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!orgId) return;

    const postUrl = await generateUploadUrl();

    const fileType = values.file[0].type;

    const result = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": fileType,
      },
      body: values.file[0]
    });
    const { storageId } = await result.json();

    const types = {
      "image/png": "image",
      "application/pdf": "pdf",
      "text/csv": "csv",
    } as Record<string, Doc<"files">["type"]>;

    try {
      await createFile({
        name: values.title,
        fileId: storageId,
        orgId: orgId,
        type: types[fileType],
      });

      toast({
        title: "File created",
        description: "Your file has been created",
        variant: "success"
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your file could not be uploaded, try again later.",
        variant: "destructive"
      })
    }

    form.reset();
    setIsFileDialogOpen(false);
  }

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  return (
        <Dialog open={isFileDialogOpen} onOpenChange={(isOpen) => {
          setIsFileDialogOpen(isOpen);
          form.reset();
        }}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                if (!orgId) return;
                
              }}
            >
              <PlusIcon className="size-4 mr-2" /> Upload file
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-8">Upload your file here</DialogTitle>
              <DialogDescription>This will be accessible by anyone in your organization.</DialogDescription>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { onChange }, ...field }) => (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input type="file" {...fileRef} disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={form.formState.isSubmitting} className="flex gap-2">
                    {form.formState.isSubmitting && (
                      <Loader2 className="size-4 mr-2 animate-spin" />
                    )}
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
  );
}
