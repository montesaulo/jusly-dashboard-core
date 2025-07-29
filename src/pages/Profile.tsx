import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  User,
  Mail,
  Building,
  Phone,
  Save,
  CreditCard,
  Settings,
  Calendar
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Estado do perfil
  const [profileData, setProfileData] = useState({
    fullName: 'Usuário de Teste',
    email: 'usuario@teste.com',
    company: 'Empresa Exemplo Ltda',
    phone: '(11) 99999-9999'
  });

  const handleSaveProfile = () => {
    console.log('Salvando perfil:', profileData);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso!",
    });
  };

  const handleQuickAction = (action: string) => {
    console.log(`Ação rápida clicada: ${action}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold text-primary">JUSLY</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Título */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Meu Perfil</h2>
          <p className="text-muted-foreground text-lg">
            Gerencie suas informações pessoais e configurações da conta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal - Informações Pessoais */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nome Completo
                  </Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <Button 
                  onClick={handleSaveProfile}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Resumo da Conta */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Resumo da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Plano Atual</span>
                  <Badge variant="secondary">Trial</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-primary text-primary-foreground">Ativo</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Extrações</span>
                  <span className="text-sm font-medium">25/100</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Membro desde</span>
                  <span className="text-sm font-medium">Janeiro 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleQuickAction('Gerenciar Assinatura')}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Gerenciar Assinatura
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleQuickAction('Configurações')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleQuickAction('Histórico de Uso')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Histórico de Uso
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;