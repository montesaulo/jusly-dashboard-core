import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  BarChart3,
  Download,
  Settings,
  LogOut,
  Circle,
  X,
  Plus
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
  
  // Estados para gráficos
  const [performanceData, setPerformanceData] = useState([
    { time: '10:00', cpu: 20, memory: 45 },
    { time: '10:05', cpu: 25, memory: 50 },
    { time: '10:10', cpu: 30, memory: 55 },
    { time: '10:15', cpu: 28, memory: 52 },
    { time: '10:20', cpu: 35, memory: 60 },
    { time: '10:25', cpu: 32, memory: 58 },
    { time: '10:30', cpu: 27, memory: 48 }
  ]);
  
  const [activityData, setActivityData] = useState([
    { time: '10:00', downloads: 5, extractions: 3 },
    { time: '10:05', downloads: 8, extractions: 6 },
    { time: '10:10', downloads: 12, extractions: 8 },
    { time: '10:15', downloads: 10, extractions: 7 },
    { time: '10:20', downloads: 15, extractions: 12 },
    { time: '10:25', downloads: 18, extractions: 14 },
    { time: '10:30', downloads: 13, extractions: 9 }
  ]);
  
  // Estados para configurações
  const [timeouts, setTimeouts] = useState({
    pageLoad: [30],
    processQuery: [30],
    elementWait: [30]
  });
  const [retrySettings, setRetrySettings] = useState({
    maxRetries: 3,
    retryInterval: 5,
    useExponentialBackoff: false
  });
  const [browserSettings, setBrowserSettings] = useState({
    useIsolatedProfile: true,
    headlessMode: true,
    disableImages: false
  });
  
  // Estados para filtros
  const [suffixesToRemove, setSuffixesToRemove] = useState(['.0500', '.0000']);
  const [newSuffix, setNewSuffix] = useState('');
  const [yearFilter, setYearFilter] = useState({ from: 2020, to: 2025 });
  const [statusFilters, setStatusFilters] = useState({
    extinto: false,
    arquivado: false,
    baixado: false
  });
  const [legalParties, setLegalParties] = useState({
    empresas: ['ltda', 's/a', 'eireli'],
    bancos: ['banco', 'caixa', 'santander'],
    governo: ['união', 'estado', 'município']
  });
  const [newLegalParty, setNewLegalParty] = useState('');
  
  // Workers mock data
  const workers = [
    { name: 'File Watcher', status: 'Ativo' },
    { name: 'Download Worker', status: 'Ativo' },
    { name: 'Extraction Worker', status: 'Ativo' },
    { name: 'System Monitor', status: 'Ativo' }
  ];

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

  // Simulação de atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      // Novo ponto de performance
      const newPerformancePoint = {
        time: timeStr,
        cpu: Math.floor(Math.random() * 60) + 10,
        memory: Math.floor(Math.random() * 40) + 30
      };
      
      // Novo ponto de atividade
      const newActivityPoint = {
        time: timeStr,
        downloads: Math.floor(Math.random() * 15) + 5,
        extractions: Math.floor(Math.random() * 10) + 3
      };
      
      setPerformanceData(oldData => [...oldData.slice(1), newPerformancePoint]);
      setActivityData(oldData => [...oldData.slice(1), newActivityPoint]);
      
      console.log('Simulando atualização de gráficos...');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

        <Tabs defaultValue="monitoramento" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monitoramento">Monitoramento</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
            <TabsTrigger value="filtros">Filtros</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoramento" className="space-y-8">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Status dos Workers */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Status dos Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {workers.map((worker) => (
                    <div key={worker.name} className="flex flex-col items-center space-y-3 p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-2">
                        <Circle className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-sm font-medium">{worker.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{worker.status}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => console.log('Restart solicitado para', worker.name)}
                      >
                        Restart
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gráficos de Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl">Performance do Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      cpu: {
                        label: "CPU",
                        color: "hsl(var(--primary))",
                      },
                      memory: {
                        label: "Memória",
                        color: "hsl(var(--destructive))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="cpu" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          name="CPU (%)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="memory" 
                          stroke="hsl(var(--destructive))" 
                          strokeWidth={2}
                          name="Memória (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl">Atividade em Tempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      downloads: {
                        label: "Downloads",
                        color: "hsl(var(--primary))",
                      },
                      extractions: {
                        label: "Extrações",
                        color: "hsl(var(--accent))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="downloads" 
                          stackId="1"
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary))"
                          fillOpacity={0.6}
                          name="Downloads"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="extractions" 
                          stackId="1"
                          stroke="hsl(var(--accent))" 
                          fill="hsl(var(--accent))"
                          fillOpacity={0.6}
                          name="Extrações"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Botões de Ação */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </TabsContent>

          <TabsContent value="configuracoes" className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="performance">
                <AccordionTrigger>Performance e Timeouts</AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="pageLoad">Timeout de Carregamento de Página: {timeouts.pageLoad[0]}s</Label>
                    <Slider
                      id="pageLoad"
                      min={5}
                      max={120}
                      step={1}
                      value={timeouts.pageLoad}
                      onValueChange={(value) => {
                        setTimeouts(prev => ({ ...prev, pageLoad: value }));
                        console.log('Timeout Carregamento de Página alterado para:', value[0]);
                      }}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="processQuery">Timeout de Consulta de Processo: {timeouts.processQuery[0]}s</Label>
                    <Slider
                      id="processQuery"
                      min={5}
                      max={120}
                      step={1}
                      value={timeouts.processQuery}
                      onValueChange={(value) => {
                        setTimeouts(prev => ({ ...prev, processQuery: value }));
                        console.log('Timeout Consulta de Processo alterado para:', value[0]);
                      }}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="elementWait">Timeout para Aguardar Elemento: {timeouts.elementWait[0]}s</Label>
                    <Slider
                      id="elementWait"
                      min={5}
                      max={120}
                      step={1}
                      value={timeouts.elementWait}
                      onValueChange={(value) => {
                        setTimeouts(prev => ({ ...prev, elementWait: value }));
                        console.log('Timeout Aguardar Elemento alterado para:', value[0]);
                      }}
                      className="w-full"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="retry">
                <AccordionTrigger>Política de Tentativas (Retry)</AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxRetries">Máximo de Tentativas</Label>
                    <Input
                      id="maxRetries"
                      type="number"
                      value={retrySettings.maxRetries}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        setRetrySettings(prev => ({ ...prev, maxRetries: value }));
                        console.log('Máximo de Tentativas alterado para:', value);
                      }}
                      min={1}
                      max={10}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="retryInterval">Intervalo entre Tentativas (segundos)</Label>
                    <Input
                      id="retryInterval"
                      type="number"
                      value={retrySettings.retryInterval}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        setRetrySettings(prev => ({ ...prev, retryInterval: value }));
                        console.log('Intervalo entre Tentativas alterado para:', value);
                      }}
                      min={1}
                      max={60}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="exponentialBackoff"
                      checked={retrySettings.useExponentialBackoff}
                      onCheckedChange={(checked) => {
                        setRetrySettings(prev => ({ ...prev, useExponentialBackoff: checked }));
                        console.log('Usar Backoff Exponencial alterado para:', checked);
                      }}
                    />
                    <Label htmlFor="exponentialBackoff">Usar Backoff Exponencial</Label>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="browser">
                <AccordionTrigger>Opções do Navegador (Chrome)</AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isolatedProfile"
                      checked={browserSettings.useIsolatedProfile}
                      onCheckedChange={(checked) => {
                        setBrowserSettings(prev => ({ ...prev, useIsolatedProfile: checked }));
                        console.log('Usar perfil isolado alterado para:', checked);
                      }}
                    />
                    <Label htmlFor="isolatedProfile">Usar perfil isolado</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="headlessMode"
                      checked={browserSettings.headlessMode}
                      onCheckedChange={(checked) => {
                        setBrowserSettings(prev => ({ ...prev, headlessMode: checked }));
                        console.log('Modo Headless alterado para:', checked);
                      }}
                    />
                    <Label htmlFor="headlessMode">Modo Headless (sem janela)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="disableImages"
                      checked={browserSettings.disableImages}
                      onCheckedChange={(checked) => {
                        setBrowserSettings(prev => ({ ...prev, disableImages: checked }));
                        console.log('Desabilitar carregamento de imagens alterado para:', checked);
                      }}
                    />
                    <Label htmlFor="disableImages">Desabilitar carregamento de imagens</Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="filtros" className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="cleanup">
                <AccordionTrigger>Filtros de Limpeza Inicial</AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Sufixos a Remover</Label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {suffixesToRemove.map((suffix, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {suffix}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => {
                              setSuffixesToRemove(prev => prev.filter((_, i) => i !== index));
                              console.log('Sufixo removido:', suffix);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ex: .0500"
                        value={newSuffix}
                        onChange={(e) => setNewSuffix(e.target.value)}
                      />
                      <Button
                        onClick={() => {
                          if (newSuffix.trim()) {
                            setSuffixesToRemove(prev => [...prev, newSuffix.trim()]);
                            console.log('Adicionar sufixo:', newSuffix.trim());
                            setNewSuffix('');
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Filtro por Período (Anos a Excluir)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="yearFrom">De</Label>
                        <Input
                          id="yearFrom"
                          type="number"
                          value={yearFilter.from}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 2020;
                            setYearFilter(prev => ({ ...prev, from: value }));
                            console.log('Ano inicial alterado para:', value);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yearTo">Até</Label>
                        <Input
                          id="yearTo"
                          type="number"
                          value={yearFilter.to}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 2025;
                            setYearFilter(prev => ({ ...prev, to: value }));
                            console.log('Ano final alterado para:', value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="process">
                <AccordionTrigger>Filtros de Processo Principal</AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Status do Processo</Label>
                    <div className="space-y-3">
                      {Object.entries(statusFilters).map(([status, checked]) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={status}
                            checked={checked}
                            onCheckedChange={(checkedValue) => {
                              setStatusFilters(prev => ({ ...prev, [status]: !!checkedValue }));
                              console.log('Filtro status', status, 'alterado para:', !!checkedValue);
                            }}
                          />
                          <Label htmlFor={status} className="capitalize">{status}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Partes Jurídicas (Categorizadas)</Label>
                    
                    {Object.entries(legalParties).map(([category, words]) => (
                      <div key={category} className="space-y-2">
                        <h4 className="text-sm font-medium capitalize text-muted-foreground">{category}</h4>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {words.map((word, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {word}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => {
                                  setLegalParties(prev => ({
                                    ...prev,
                                    [category]: prev[category].filter((_, i) => i !== index)
                                  }));
                                  console.log('Remover palavra:', word);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ex: ltda, s/a, banco"
                        value={newLegalParty}
                        onChange={(e) => setNewLegalParty(e.target.value)}
                      />
                      <Button
                        onClick={() => {
                          if (newLegalParty.trim()) {
                            // Adiciona na categoria "empresas" por padrão
                            setLegalParties(prev => ({
                              ...prev,
                              empresas: [...prev.empresas, newLegalParty.trim()]
                            }));
                            console.log('Adicionar parte jurídica:', newLegalParty.trim());
                            setNewLegalParty('');
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;