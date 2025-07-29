import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  BarChart3,
  Download,
  Settings,
  LogOut
} from "lucide-react";

// Dados simulados
const mockProfile = {
  full_name: 'Usuário de Teste',
  plan_type: 'trial',
  extractions_used: 25,
  extractions_limit: 100,
};

const mockExtractions = [
  { id: 1, process_number: '0012345-67.2023.8.26.0001', created_at: new Date().toISOString(), extraction_status: 'completed' },
  { id: 2, process_number: '0023456-78.2023.8.26.0002', created_at: new Date().toISOString(), extraction_status: 'processing' },
  { id: 3, process_number: '0034567-89.2023.8.26.0003', created_at: new Date().toISOString(), extraction_status: 'failed' },
];

const Dashboard = () => {
  const [profile] = useState(mockProfile);
  const [extractions] = useState(mockExtractions);

  const completedExtractions = extractions.filter(e => e.extraction_status === 'completed').length;
  const processingExtractions = extractions.filter(e => e.extraction_status === 'processing').length;
  const failedExtractions = extractions.filter(e => e.extraction_status === 'failed').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-primary text-primary-foreground">Concluída</Badge>;
      case 'processing':
        return <Badge className="bg-blue-600 text-white">Processando</Badge>;
      case 'failed':
        return <Badge variant="destructive">Falhou</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Fixo */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">JUSLY</h1>
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
              {profile.plan_type}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => console.log('Configurações clicado')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => console.log('Sair clicado')}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Seção de Boas-Vindas */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Bem-vindo, {profile.full_name}!
          </h2>
          <p className="text-muted-foreground text-lg">
            Gerencie suas extrações de precatórios e monitore seu progresso.
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Extrações Usadas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile.extractions_used}</div>
              <div className="text-xs text-muted-foreground mb-2">
                de {profile.extractions_limit} disponíveis
              </div>
              <Progress 
                value={(profile.extractions_used / profile.extractions_limit) * 100} 
                className="w-full"
              />
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{completedExtractions}</div>
              <p className="text-xs text-muted-foreground">
                extrações finalizadas
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processando</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{processingExtractions}</div>
              <p className="text-xs text-muted-foreground">
                em andamento
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Falharam</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{failedExtractions}</div>
              <p className="text-xs text-muted-foreground">
                com erro
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Button 
            className="h-24 text-lg bg-gradient-primary hover:shadow-glow transition-all duration-300"
            onClick={() => console.log('Nova Extração clicado')}
          >
            <Upload className="h-6 w-6 mr-3" />
            Nova Extração
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 text-lg"
            onClick={() => console.log('Analytics clicado')}
          >
            <BarChart3 className="h-6 w-6 mr-3" />
            Analytics
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 text-lg"
            onClick={() => console.log('Exportar Dados clicado')}
          >
            <Download className="h-6 w-6 mr-3" />
            Exportar Dados
          </Button>
        </div>

        {/* Tabela de Extrações Recentes */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">Extrações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {extractions.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma extração encontrada</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Número do Processo</th>
                      <th className="text-left py-3 px-4 font-medium">Data</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractions.map((extraction) => (
                      <tr key={extraction.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-mono text-sm">
                          {extraction.process_number}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {formatDate(extraction.created_at)}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(extraction.extraction_status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;