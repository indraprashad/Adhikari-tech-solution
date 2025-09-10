import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building, User, Upload, FileText, Send } from "lucide-react";

const HireForm = () => {
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [companyData, setCompanyData] = useState({
    company_name: "",
    company_email: "",
    company_contact: "",
    reason: "",
    company_license: null,
  });
  const [personalData, setPersonalData] = useState({
    name: "",
    email: "",
    contact: "",
    reason: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const uploadFile = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("company-licenses")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("company-licenses")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const sendEmail = async (requestData) => {
    try {
      const { error } = await supabase.functions.invoke(
        "send-hire-notification",
        {
          body: requestData,
        }
      );

      if (error) {
        console.error("Email error:", error);
        // Don't fail the whole process if email fails
      }
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let company_license_url = "";

      if (companyData.company_license) {
        setFileUploading(true);
        company_license_url = await uploadFile(companyData.company_license);
        setFileUploading(false);
      }

      const requestData = {
        type: "company",
        company_name: companyData.company_name,
        company_email: companyData.company_email,
        company_contact: companyData.company_contact,
        company_license_url,
        reason: companyData.reason,
        status: "pending",
      };

      const { error } = await supabase
        .from("hire_requests")
        .insert([requestData]);

      if (error) throw error;

      // Send email notification
      await sendEmail(requestData);

      toast({
        title: "Request Submitted Successfully!",
        description:
          "Your hiring request has been submitted. I'll get back to you soon.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description:
          error.message || "Failed to submit your request. Please try again.",
      });
    } finally {
      setLoading(false);
      setFileUploading(false);
    }
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        type: "personal",
        name: personalData.name,
        email: personalData.email,
        contact: personalData.contact,
        reason: personalData.reason,
        status: "pending",
      };

      const { error } = await supabase
        .from("hire_requests")
        .insert([requestData]);

      if (error) throw error;

      // Send email notification
      await sendEmail(requestData);

      toast({
        title: "Request Submitted Successfully!",
        description:
          "Your project request has been submitted. I'll get back to you soon.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description:
          error.message || "Failed to submit your request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["application/pdf", "image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF, PNG, or JPEG file.",
        });
        return;
      }
      setCompanyData({ ...companyData, company_license: file });
    }
  };

  return (
    <Layout>
      <section className="hero-gradient-soft py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Hire Me for Your{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Next Project
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Let's bring your ideas to life with cutting-edge technology
              solutions. Choose whether you're representing a company or
              submitting a personal request.
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-center">
                Project Request Form
              </CardTitle>
              <CardDescription className="text-center">
                Fill out the form below to get started on your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="company" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="company"
                    className="flex items-center gap-2"
                  >
                    <Building className="w-4 h-4" />
                    Company Request
                  </TabsTrigger>
                  <TabsTrigger
                    value="personal"
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Personal Request
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="company" className="mt-6">
                  <form onSubmit={handleCompanySubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company_name">Company Name *</Label>
                        <Input
                          id="company_name"
                          value={companyData.company_name}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              company_name: e.target.value,
                            })
                          }
                          placeholder="Enter your company name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company_email">Company Email *</Label>
                        <Input
                          id="company_email"
                          type="email"
                          value={companyData.company_email}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              company_email: e.target.value,
                            })
                          }
                          placeholder="company@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company_contact">Contact Number *</Label>
                      <Input
                        id="company_contact"
                        value={companyData.company_contact}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            company_contact: e.target.value,
                          })
                        }
                        placeholder="Enter your contact number"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company_license">
                        Company License (PNG/PDF)
                      </Label>
                      <div className="flex items-center gap-4">
                        {/* Replaced default file input with hidden input and button trigger for better alignment */}
                        <input
                          id="company_license"
                          type="file"
                          onChange={handleFileChange}
                          accept=".png,.pdf,.jpeg,.jpg"
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="inline-flex items-center gap-2"
                          onClick={() => {
                            const input = document.getElementById("company_license");
                            input?.click();
                          }}
                        >
                          <Upload className="w-4 h-4" />
                          Choose file
                        </Button>
                        <span className="text-sm text-muted-foreground truncate">
                          {companyData.company_license ? companyData.company_license.name : "No file selected"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company_reason">
                        Reason for Hiring Project *
                      </Label>
                      <Textarea
                        id="company_reason"
                        value={companyData.reason}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            reason: e.target.value,
                          })
                        }
                        placeholder="Describe your project requirements, goals, and timeline..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading || fileUploading}
                      size="lg"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {loading
                        ? "Submitting..."
                        : fileUploading
                          ? "Uploading File..."
                          : "Submit Company Request"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="personal" className="mt-6">
                  <form onSubmit={handlePersonalSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="personal_name">Full Name *</Label>
                        <Input
                          id="personal_name"
                          value={personalData.name}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              name: e.target.value,
                            })
                          }
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="personal_email">Email Address *</Label>
                        <Input
                          id="personal_email"
                          type="email"
                          value={personalData.email}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              email: e.target.value,
                            })
                          }
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="personal_contact">Contact Number *</Label>
                      <Input
                        id="personal_contact"
                        value={personalData.contact}
                        onChange={(e) =>
                          setPersonalData({
                            ...personalData,
                            contact: e.target.value,
                          })
                        }
                        placeholder="Enter your contact number"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="personal_reason">
                        Reason for Assigning Project *
                      </Label>
                      <Textarea
                        id="personal_reason"
                        value={personalData.reason}
                        onChange={(e) =>
                          setPersonalData({
                            ...personalData,
                            reason: e.target.value,
                          })
                        }
                        placeholder="Describe your project idea, requirements, and what you hope to achieve..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                      size="lg"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {loading ? "Submitting..." : "Submit Personal Request"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default HireForm;