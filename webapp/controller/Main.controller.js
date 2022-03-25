sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.arcelor.ZREG_ABORDAGEM.controller.Main", {
		onInit: function() {
			var oViewModel = new JSONModel({

				Initial_Fragment: "RespPrincipalFragment",
				ics: 0,
				abordagemId: "",
				habilitarResp1: false,
				habilitarResp2: false,
				habilitarResp3: false,
				enabledResponsavelPrincipal: false,
				visiblePessoaAbordada: false,
				visibleDefIndiceCompSeguro: false,
				visibleGrauRisco: false,
				visibleClassificacao: false,
				visibleEstratfDesvio: false,
				visibleRisco: false,
				visibleDescricaoCompFirmado: false,
				visibleTipoEPI: false,
				ListaClassificacoes: [],
				ListaCodAtivadores: [],
				ListaEventos: [],
				ListaGrausRisco: [],
				ListaHouveViolacao: [],
				ListaInstanteAbord: [],
				ListaLocaisInst: [],
				ListaResponsaveis: [],
				ListaRiscos: [],
				ListaAreaAbordada: [],
				ListaEmprAbordada: [],
				ListaTipoAbordagem: [],
				ListaPessoaAbordada: [],
				ListaEstratificacaoDesvio: [],
				ListaEPI: [],
				TextAreaDescAbordagem: "",
				TextAreaDescAcaoImediata: "",
				TextAreaDescComprFirmado: "",

				ResponsavelHelpRequest: "",

				/*Visibilidade: "Potencial de Risco" e "Código ativador", para "O empregado/equipe identificou e controlou o risco?" - Inicio*/
				visiblePotencialRisco1: false,
				visibleCodAtivador1: false,
				/*Visibilidade: "Potencial de Risco" e "Código ativador", para "O empregado/equipe identificou e controlou o risco?" - Fim*/

				/*Visibilidade: "Potencial de Risco" e "Código ativador", para "O empregado/equipe estava utilizando todos os EPIs Especificados para a atividade?" - Inicio*/
				visiblePotencialRisco2: false,
				visibleCodAtivador2: false,
				/*Visibilidade: "Potencial de Risco" e "Código ativador", para "O empregado/equipe estava utilizando todos os EPIs Especificados para a atividade?" - Fim*/

				/*Visibilidade: "Potencial de Risco" e "Código ativador", para "O empregado/equipe estava utilizando todas as ferramentas, equipamentos e recursos adequados para atividade?" - Inicio*/
				visiblePotencialRisco3: false,
				visibleCodAtivador3: false,
				/*Visibilidade: "Potencial de Risco" e "Código ativador", para "O empregado/equipe estava utilizando todas as ferramentas, equipamentos e recursos adequados para atividade?" - Fim*/

				/*Visibilidade: "Potencial de Risco" e "Código ativador", para "O empregado/equipe estava seguindo todas as normas, procedimentos e métodos planejados?" - Inicio*/
				visiblePotencialRisco4: false,
				visibleCodAtivador4: false,
				/*Visibilidade: "Potencial de Risco" e "Código ativador", para "O empregado/equipe estava seguindo todas as normas, procedimentos e métodos planejados?" - Fim*/

				/*Visibilidade: "Potencial de Risco" e "Código ativador", para "CO empregado/equipe foi treinado para execução da atividade (Treinamentos Obrigatórios / Padrão / Análise de Risco)?" - Inicio*/
				visiblePotencialRisco5: false,
				visibleCodAtivador5: false,
				/*Visibilidade: "Potencial de Risco" e "Código ativador", para "O empregado/equipe foi treinado para execução da atividade (Treinamentos Obrigatórios / Padrão / Análise de Risco)?" - Fim*/

				/* Responsável Principal - Inicio*/
				ResponsavelPrincipal: {
					MATRICULA: "",
					NOME: "",
					NOME_EMPRESA_LONGO: "",
					UNIDADE_ORGANIZACIONAL: "",
					DESC_UNIDADE_ORG: "",
					COD_EMPRESA: "",
					DESC_EMPRESA: ""
				},
				/* Responsável Principal - Fim*/

				/* Responsável 1 - Inicio*/
				Responsavel1: {
					MATRICULA: "",
					NOME: "",
					NOME_EMPRESA_LONGO: "",
					UNIDADE_ORGANIZACIONAL: "",
					DESC_UNIDADE_ORG: "",
					COD_EMPRESA: "",
					DESC_EMPRESA: ""
				},
				/* Responsável 1 - Fim*/

				/* Responsável 2 - Inicio*/
				Responsavel2: {
					MATRICULA: "",
					NOME: "",
					NOME_EMPRESA_LONGO: "",
					UNIDADE_ORGANIZACIONAL: "",
					DESC_UNIDADE_ORG: "",
					COD_EMPRESA: "",
					DESC_EMPRESA: ""
				},
				/* Responsável 2 - Fim*/

				/* Responsável 3 - Inicio*/
				Responsavel3: {
					MATRICULA: "",
					NOME: "",
					NOME_EMPRESA_LONGO: "",
					UNIDADE_ORGANIZACIONAL: "",
					DESC_UNIDADE_ORG: "",
					COD_EMPRESA: "",
					DESC_EMPRESA: ""
				}
				/* Responsável 3 - Fim*/

			});
			this.getView().setModel(oViewModel, "registrarAbordagem");
			this.getDadosSelecoes();
		},

		onChangeTipoAbordagem: function(oEvent) {
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var selectedkey = oEvent.getSource().getSelectedKey();

			if (selectedkey === "3") {
				oViewmodel.setProperty("/habilitarResp1", true);
				oViewmodel.setProperty("/habilitarResp2", true);
				oViewmodel.setProperty("/habilitarResp3", true);
			} else {
				this.getView().byId("iconTabResponsavel").setSelectedKey("RespPrincipalFragment");
				for (var i = 1; i <= 3; i++) {
					oViewmodel.setProperty("/Responsavel" + i + "/MATRICULA", "");
					oViewmodel.setProperty("/Responsavel" + i + "/NOME", "");
					oViewmodel.setProperty("/Responsavel" + i + "/NOME_EMPRESA_LONGO", "");
					oViewmodel.setProperty("/Responsavel" + i + "/UNIDADE_ORGANIZACIONAL", "");
					oViewmodel.setProperty("/Responsavel" + i + "/DESC_UNIDADE_ORG", "");
					oViewmodel.setProperty("/Responsavel" + i + "/COD_EMPRESA", "");
					oViewmodel.setProperty("/Responsavel" + i + "/DESC_EMPRESA", "");
				}

				oViewmodel.setProperty("/habilitarResp1", false);
				oViewmodel.setProperty("/habilitarResp2", false);
				oViewmodel.setProperty("/habilitarResp3", false);
			}

			if (selectedkey === "2" || selectedkey === "3") {
				oViewmodel.setProperty("/visiblePessoaAbordada", true);
			} else {
				this.getView().byId("PessoaAbordada").setSelectedKey("");
				oViewmodel.setProperty("/visiblePessoaAbordada", false);
			}

			this.onChangeHouveDesvio();
		},

		onChangeAreaAbordada: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel();
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var selectedkey = oEvent.getSource().getSelectedKey();

			var sURL = "/GET_LIST_PESSOA_ABORDADASet(AREA_ABORD='" + selectedkey + "')";

			sap.ui.core.BusyIndicator.show();
			oModel.read(sURL, {
				success: function(oData) {
					sap.ui.core.BusyIndicator.hide();
					if (oData.LISTA_PESSOA_ABORDADA) {
						var oListPessoaAbordada = JSON.parse(oData.LISTA_PESSOA_ABORDADA);
						oViewmodel.setProperty("/ListaPessoaAbordada", oListPessoaAbordada);
					}

				}.bind(this),
				error: function(oError) {
					sap.ui.core.BusyIndicator.hide();

				}.bind(this)
			});
		},

		onChangeClassifacao: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel();
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var selectedkey = oEvent.getSource().getSelectedKey();
			var classificaçãoURI = encodeURIComponent(selectedkey);
			var TipoEPI = this.getView().byId("TipoEPI");

			if (selectedkey === "EPI") {
				oViewmodel.setProperty("/visibleTipoEPI", true);
			} else {
				TipoEPI.setSelectedKey("");
				oViewmodel.setProperty("/visibleTipoEPI", false);
			}

			var sURL = "/GET_ESTRATF_DESVIOSet(CLASSIFICACAO='" + classificaçãoURI + "')";

			sap.ui.core.BusyIndicator.show();
			oModel.read(sURL, {
				success: function(oData) {
					sap.ui.core.BusyIndicator.hide();
					if (oData.LISTA_ESTRATF_DESVIO) {
						var oListaEstratificacao = JSON.parse(oData.LISTA_ESTRATF_DESVIO);
						oListaEstratificacao.unshift({
							VALUE: "",
							TEXT: ""
						});
						oViewmodel.setProperty("/ListaEstratificacaoDesvio", oListaEstratificacao);
					}

				}.bind(this),
				error: function(oError) {
					sap.ui.core.BusyIndicator.hide();

				}.bind(this)
			});
		},

		onCloseDialog: function(sID) {
			this.getView().byId(sID).close();

			if (sID === "ResponsavelHelpFrag") {
				this.getView().byId("SearchFieldResponsaveis").clear();
			}
		},
		/* Ajuda de pesquisa para buscar responsável - Inicio*/
		valueHelpSetResponsavel: function(oEvent) {
			var oViewModel = this.getView().getModel("registrarAbordagem");
			var matricula = oEvent.getSource().getAggregation("cells")[0].getText();
			var nomeResponsavel = oEvent.getSource().getAggregation("cells")[1].getText();
			var ResponsavelEvent = oViewModel.getProperty("/ResponsavelHelpRequest"); // Busca qual campo de responsável na tela disparou o evento
			var ResponsavelID = ResponsavelEvent.replaceAll("/", "");

			oViewModel.setProperty(ResponsavelEvent + "/MATRICULA", matricula);
			oViewModel.setProperty(ResponsavelEvent + "/NOME", nomeResponsavel);

			this.onCloseDialog("ResponsavelHelpFrag");
			this.getView().byId(ResponsavelID).fireChange();
		},

		onValueHelpResponsaveisRequest: function(oEvent) {
			var oViewModel = this.getView().getModel("registrarAbordagem");
			var aTipoResponsavel = oEvent.getSource().getBindingInfo("value").binding.getBindings()[1].getPath();
			aTipoResponsavel = aTipoResponsavel.split("/");
			aTipoResponsavel = "/" + aTipoResponsavel[1];
			oViewModel.setProperty("/ResponsavelHelpRequest", aTipoResponsavel); // Seta qual campo de responsável na tela disparou o evento
			this._openValueHelpResponsaveis().open();
		},

		_openValueHelpResponsaveis: function() {
			if (!this.openValueHelpResponsaveis) {
				this.openValueHelpResponsaveis = sap.ui.xmlfragment(this.getView().getId(),
					"com.arcelor.ZREG_ABORDAGEM.view.fragments.ResponsaveisHelp", this);
				this.getView().addDependent(this.openValueHelpResponsaveis);
			}
			return this.openValueHelpResponsaveis;
		},
		/* Ajuda de pesquisa para buscar responsável - Fim*/

		//Filtro de pesquisa em tela para lista de responsáveis retornada
		onFilterResponsaveis: function(oEvent) {
			// add filter for search
			var oViewModel = this.getView().getModel("registrarAbordagem");
			var oItens = this.getView().byId("SearchFieldResponsaveis").getValue();
			var aFilters = [];
			var sQuery = oItens;

			this._oGlobalFilter = new Filter([
				new Filter("PERNR", FilterOperator.Contains, sQuery),
				new Filter("ENAME", FilterOperator.Contains, sQuery)
			], false);

			aFilters = this._oGlobalFilter;
			var oList = this.byId("HelpTableResponsaveis");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		onChangeResponsavel: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel();
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var aTipoResponsavel = oEvent.getSource().getBindingInfo("value").parts[1];
			var ResponsavelBinding = aTipoResponsavel.path.split("/"); // Busca se o binding é Responsavel: principal, 1, 2 ou 3
			var tipoResponsavel = "/" + ResponsavelBinding[1];
			var matricula = oEvent.getSource().getValue();
			matricula = matricula !== "" && matricula.match(/\d+/g) !== null ? matricula.match(/\d+/g)[0] : ""; //Pega apenas o valor número do componente que disparou o evento

			var sURL = "/GET_DADOS_RESPONSAVEISSet(PERNR='" + matricula + "')";

			/***
			 * Se a matricula estiver vazia a RFC retorna o usuário logado, 
			 * como os responsáveis de 1 a 3 não são obrigatórios, 
			 * caso o usuário preencha a matriula vazia serão retornados os campos vazios*/
			if (matricula === "" && tipoResponsavel !== "/ResponsavelPrincipal") {
				oViewmodel.setProperty(tipoResponsavel + "/COD_EMPRESA", "");
				oViewmodel.setProperty(tipoResponsavel + "/DESC_EMPRESA", "");
				oViewmodel.setProperty(tipoResponsavel + "/DESC_UNIDADE_ORG", "");
				oViewmodel.setProperty(tipoResponsavel + "/NOME_EMPRESA_LONGO", "");
				oViewmodel.setProperty(tipoResponsavel + "/NOME", "");
				oViewmodel.setProperty(tipoResponsavel + "/MATRICULA", "");
				oViewmodel.setProperty(tipoResponsavel + "/UNIDADE_ORGANIZACIONAL", "");
				return;
			}

			sap.ui.core.BusyIndicator.show();
			oModel.read(sURL, {
				success: function(oData) {
					sap.ui.core.BusyIndicator.hide();
					oViewmodel.setProperty(tipoResponsavel + "/COD_EMPRESA", oData.COD_EMRPESA);
					oViewmodel.setProperty(tipoResponsavel + "/DESC_EMPRESA", oData.DESC_EMPRESA);
					oViewmodel.setProperty(tipoResponsavel + "/DESC_UNIDADE_ORG", oData.DESC_UN_ORG);
					oViewmodel.setProperty(tipoResponsavel + "/NOME_EMPRESA_LONGO", oData.NOME_EMPRESA_LONGO);
					oViewmodel.setProperty(tipoResponsavel + "/NOME", oData.NOME_RESPONSAVEL);
					oViewmodel.setProperty(tipoResponsavel + "/MATRICULA", oData.PERNR);
					oViewmodel.setProperty(tipoResponsavel + "/UNIDADE_ORGANIZACIONAL", oData.UNIDADE_ORGANIZACIONAL);

					oViewmodel.refresh(true);

				}.bind(this),
				error: function(oError) {
					sap.ui.core.BusyIndicator.hide();

				}.bind(this)
			});
		},

		onChangeMetodoCoach: function(oEvent) {
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var selectedkey = oEvent.getSource().getSelectedKey();
			var ControlouRisco = this.getView().byId("ControlouRisco");
			var PotencialRisco1 = this.getView().byId("PotencialRisco1");
			var CodigoAtivador1 = this.getView().byId("CodigoAtivador1");
			var EPIsCorretos = this.getView().byId("EPIsCorretos");
			var PotencialRisco2 = this.getView().byId("PotencialRisco2");
			var CodigoAtivador2 = this.getView().byId("CodigoAtivador2");
			var FerramentasCorretas = this.getView().byId("FerramentasCorretas");
			var PotencialRisco3 = this.getView().byId("PotencialRisco3");
			var CodigoAtivador3 = this.getView().byId("CodigoAtivador3");
			var SeguindoNormas = this.getView().byId("SeguindoNormas");
			var PotencialRisco4 = this.getView().byId("PotencialRisco4");
			var CodigoAtivador4 = this.getView().byId("CodigoAtivador4");
			var FoiTreinado = this.getView().byId("FoiTreinado");
			var PotencialRisco5 = this.getView().byId("PotencialRisco5");
			var CodigoAtivador5 = this.getView().byId("CodigoAtivador5");
			var ICSVal = this.getView().byId("ICSVal");
			var CompromissoFirmado = this.getView().byId("CompromissoFirmado");
			var DescricaoComprFirmado = this.getView().byId("DescricaoComprFirmado");

			if (selectedkey === "S") {
				oViewmodel.setProperty("/ics", 100);
				oViewmodel.setProperty("/visibleDefIndiceCompSeguro", true);
			} else {
				ControlouRisco.setSelectedKey("S");
				PotencialRisco1.setSelectedKey("");
				CodigoAtivador1.setSelectedKey("");
				EPIsCorretos.setSelectedKey("S");
				PotencialRisco2.setSelectedKey("");
				CodigoAtivador2.setSelectedKey("");
				FerramentasCorretas.setSelectedKey("S");
				PotencialRisco3.setSelectedKey("");
				CodigoAtivador3.setSelectedKey("");
				SeguindoNormas.setSelectedKey("S");
				PotencialRisco4.setSelectedKey("");
				CodigoAtivador4.setSelectedKey("");
				FoiTreinado.setSelectedKey("S");
				PotencialRisco5.setSelectedKey("");
				CodigoAtivador5.setSelectedKey("");
				ICSVal.setValue(0);
				CompromissoFirmado.setSelectedKey("N");
				DescricaoComprFirmado.setValue("");

				oViewmodel.setProperty("/visibleDescricaoCompFirmado", false);
				oViewmodel.setProperty("/visiblePotencialRisco1", false);
				oViewmodel.setProperty("/visibleCodAtivador1", false);
				oViewmodel.setProperty("/visiblePotencialRisco2", false);
				oViewmodel.setProperty("/visibleCodAtivador2", false);
				oViewmodel.setProperty("/visiblePotencialRisco3", false);
				oViewmodel.setProperty("/visibleCodAtivador3", false);
				oViewmodel.setProperty("/visiblePotencialRisco4", false);
				oViewmodel.setProperty("/visibleCodAtivador4", false);
				oViewmodel.setProperty("/visiblePotencialRisco5", false);
				oViewmodel.setProperty("/visibleCodAtivador5", false);

				oViewmodel.setProperty("/visibleDefIndiceCompSeguro", false);
			}
		},

		onChangeHouveDesvio: function(oEvent) {
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var tipoAbordagemSelecionada = this.getView().byId("TipoAbordagem").getSelectedKey();
			var selectedkey = this.getView().byId("HouveDesvio").getSelectedKey();
			var GrauRisco = this.getView().byId("GrauRisco");
			var Classificacao = this.getView().byId("Classificacao");
			var TipoEPI = this.getView().byId("TipoEPI");
			var EstratificacaoDesvio = this.getView().byId("EstratificacaoDesvio");
			var Risco = this.getView().byId("Risco");

			if (selectedkey === "S") {
				if (tipoAbordagemSelecionada === "2" || tipoAbordagemSelecionada === "3") {
					oViewmodel.setProperty("/visibleGrauRisco", true);
				} else {
					GrauRisco.setSelectedKey("");
					oViewmodel.setProperty("/visibleGrauRisco", false);
				}

				oViewmodel.setProperty("/visibleClassificacao", true);
				oViewmodel.setProperty("/visibleEstratfDesvio", true);
				oViewmodel.setProperty("/visibleRisco", true);

			} else {
				GrauRisco.setSelectedKey("");
				Classificacao.setSelectedKey("");
				TipoEPI.setSelectedKey("");
				EstratificacaoDesvio.setSelectedKey("");
				Risco.setSelectedKey("");
				oViewmodel.setProperty("/visibleTipoEPI", false);
				oViewmodel.setProperty("/visibleGrauRisco", false);
				oViewmodel.setProperty("/visibleClassificacao", false);
				oViewmodel.setProperty("/visibleEstratfDesvio", false);
				oViewmodel.setProperty("/visibleRisco", false);
			}
		},

		onChangeCamposDefIndice: function(sID, sProperty1, sProperty2, sIdPotRisco, sIdCodAtv) { //Dispara quando os campos de seleção Sim ou não da área de tela "Definição do Índice de Comportamento Seguro" são alterados
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var selectedkey = this.getView().byId(sID).getSelectedKey();

			if (selectedkey === "N") {
				oViewmodel.setProperty(sProperty1, true);
				oViewmodel.setProperty(sProperty2, true);
				this.onCalculaICS();
			} else {
				this.getView().byId(sIdPotRisco).setSelectedKey("");
				this.getView().byId(sIdCodAtv).setSelectedKey("");
				oViewmodel.setProperty(sProperty1, false);
				oViewmodel.setProperty(sProperty2, false);
			}
		},

		onChangeCompromissoFirmado: function(oEvent) {
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var selectedkey = oEvent.getSource().getSelectedKey();

			if (selectedkey === "S") {
				oViewmodel.setProperty("/visibleDescricaoCompFirmado", true);
			} else {
				this.getView().byId("DescricaoComprFirmado").setValue("");
				oViewmodel.setProperty("/visibleDescricaoCompFirmado", false);
			}
		},

		//Salva os dados da abordagem
		onGravarAbordagem: function(oAbordagem) {
			var oModel = this.getOwnerComponent().getModel();
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var DadosAbordagem = JSON.stringify(oAbordagem);
			var sMessage;

			var oEntry = {
				DADOS_ABORDAGEM: DadosAbordagem
			};

			sap.ui.core.BusyIndicator.show();
			oModel.create("/GRAVAR_ABORDAGEMSet", oEntry, {

				success: function(oData) {
					sap.ui.core.BusyIndicator.hide();
					if (oData.MENSAGEM_RETORNO) {
						var oMensagem = JSON.parse(oData.MENSAGEM_RETORNO);

						if (oMensagem.TYPE === "S") {
							sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgSucessoAoGravar");
							MessageBox.success(sMessage);
							this.limparTela();
						}
					}

				}.bind(this),

				error: function(error) {
					sap.ui.core.BusyIndicator.hide();
					MessageBox.error("Ocorreu um erro inesperado ao salvar os dados, tente novamente.");
				}.bind(this)

			});
		},

		//Valida os campos obrigatórios respeitando a regra de visibilidade dos mesmos e monta a estrutura de dados para salvar
		validaDadosAbordagem: function() {
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var ICSValue = oViewmodel.getProperty("/ics");
			var AbordagemID = oViewmodel.getProperty("/abordagemId");
			var TipoAbordagem = this.getView().byId("TipoAbordagem").getSelectedKey();
			var MetodoCoach = this.getView().byId("MetodoCoach").getSelectedKey();
			var Data = this.getView().byId("Data").getDateValue();
			var EmpresaAbordada = this.getView().byId("EmpresaAbordada").getSelectedKey();
			var AreaAbordada = this.getView().byId("AreaAbordada").getSelectedKey();
			var LocalInstalacao = this.getView().byId("LocalInstalacao").getSelectedKey();
			var HouveDesvio = this.getView().byId("HouveDesvio").getSelectedKey();
			var DescricaoAbordagem = this.getView().byId("DescricaoAbordagem").getValue();
			var AcaoImediata = this.getView().byId("AcaoImediata").getValue();
			var Evento = this.getView().byId("Evento").getSelectedKey();
			var HouveViolacao = this.getView().byId("HouveViolacao").getSelectedKey();
			var InstanteAbordagem = this.getView().byId("InstanteAbordagem").getSelectedKey();
			var DataAtual = new Date();
			var PessoaAbordada = "";
			var GrauRisco = "";
			var Classificacao = "";
			var TipoEPI = "";
			var EstratificacaoDesvio = "";
			var Risco = "";
			var ControlouRisco = this.getView().byId("ControlouRisco").getSelectedKey();
			var EPIsCorretos = this.getView().byId("EPIsCorretos").getSelectedKey();
			var FerramentasCorretas = this.getView().byId("FerramentasCorretas").getSelectedKey();
			var SeguindoNormas = this.getView().byId("SeguindoNormas").getSelectedKey();
			var FoiTreinado = this.getView().byId("FoiTreinado").getSelectedKey();
			var PotencialRisco1 = "";
			var CodigoAtivador1 = "";
			var PotencialRisco2 = "";
			var CodigoAtivador2 = "";
			var PotencialRisco3 = "";
			var CodigoAtivador3 = "";
			var PotencialRisco4 = "";
			var CodigoAtivador4 = "";
			var PotencialRisco5 = "";
			var CodigoAtivador5 = "";
			var CompromissoFirmado = this.getView().byId("CompromissoFirmado").getSelectedKey();
			var DescricaoComprFirmado = "";
			var ResponsavelPrincipal = oViewmodel.getProperty("/ResponsavelPrincipal/MATRICULA");
			var CodEmpresaPrincial = this.getView().byId("CodEmpresaPrincial").getValue(); // Apenas para o responsável principal o código da empresa fica no campo "Site"
			var DescEmpresaPrincial = this.getView().byId("DescEmpresaPrincial").getText();
			var NomeEmpresaLongo = this.getView().byId("NomeEmpresaLongo").getValue();
			var UnidadeOrganizacionalPrincipal = this.getView().byId("UnidadeOrganizacionalPrincipal").getValue();
			var DescUniOrganizacionalPrincipal = this.getView().byId("DescUniOrganizacionalPrincipal").getText();
			var Responsavel1 = oViewmodel.getProperty("/Responsavel1/MATRICULA");
			var CodEmpresa1 = this.getView().byId("CodEmpresa1").getValue();
			var DescEmpresa1 = this.getView().byId("DescEmpresa1").getText();
			var UnidadeOrganizacional1 = this.getView().byId("UnidadeOrganizacional1").getValue();
			var DescUniOrganizacional1 = this.getView().byId("DescUniOrganizacional1").getText();
			var Responsavel2 = oViewmodel.getProperty("/Responsavel2/MATRICULA");
			var CodEmpresa2 = this.getView().byId("CodEmpresa3").getValue();
			var DescEmpresa2 = this.getView().byId("DescEmpresa3").getText();
			var UnidadeOrganizacional2 = this.getView().byId("UnidadeOrganizacional2").getValue();
			var DescUniOrganizacional2 = this.getView().byId("DescUniOrganizacional2").getText();
			var Responsavel3 = oViewmodel.getProperty("/Responsavel3/MATRICULA");
			var CodEmpresa3 = this.getView().byId("CodEmpresa3").getValue();
			var DescEmpresa3 = this.getView().byId("DescEmpresa3").getText();
			var UnidadeOrganizacional3 = this.getView().byId("UnidadeOrganizacional3").getValue();
			var DescUniOrganizacional3 = this.getView().byId("DescUniOrganizacional3").getText();
			var sMessage;

			// Valida campo obrigatórios - Inicio
			if (TipoAbordagem === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgTipoAbordagemObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (MetodoCoach === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgMetodoCoachObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (Data === null || Data === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgDataObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (Data > DataAtual) {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgDataMaiorAtual");
				MessageBox.error(sMessage);
				return;
			} else if (EmpresaAbordada === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgEmpresaAbordObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (AreaAbordada === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgAreaAbordObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (LocalInstalacao === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgLocalInstObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (HouveDesvio === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgHouveDesvioObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (DescricaoAbordagem === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgDescricaoAbordagemObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (AcaoImediata === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgAcaoImediataObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (Evento === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgEventObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (HouveViolacao === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgHouveViolacaoObrigatorio");
				MessageBox.error(sMessage);
				return;
			} else if (InstanteAbordagem === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgInstanteAbordagemObrigatorio");
				MessageBox.error(sMessage);
				return;
			}

			if (TipoAbordagem === "2" || TipoAbordagem === "3") {
				PessoaAbordada = this.getView().byId("PessoaAbordada").getSelectedKey();

				if (PessoaAbordada === "") {
					sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgPessoaAbordadaObrigatorio");
					MessageBox.error(sMessage);
					return;
				}
			}

			if (HouveDesvio === "S") {
				if (TipoAbordagem === "2" || TipoAbordagem === "3") {
					GrauRisco = this.getView().byId("GrauRisco").getSelectedKey();

					if (GrauRisco === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgGrauRiscoOgrigatorio");
						MessageBox.error(sMessage);
						return;
					}
				}
				Classificacao = this.getView().byId("Classificacao").getSelectedKey();
				EstratificacaoDesvio = this.getView().byId("EstratificacaoDesvio").getSelectedKey();
				Risco = this.getView().byId("Risco").getSelectedKey();

				if (Classificacao === "") {
					sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgClassificacaoObrigatorio");
					MessageBox.error(sMessage);
					return;
				} else if (EstratificacaoDesvio === "") {
					sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgEstratfDesvioObrigatorio");
					MessageBox.error(sMessage);
					return;
				} else if (Risco === "") {
					sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgRiscoOrigatorio");
					MessageBox.error(sMessage);
					return;
				}

				if (Classificacao === "EPI") {
					TipoEPI = this.getView().byId("TipoEPI").getSelectedKey();

					if (TipoEPI === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgTipoEPIObrigatorio");
						MessageBox.error(sMessage);
						return;
					}
				}
			}

			if (MetodoCoach === "S") {

				if (ControlouRisco === "N") {
					PotencialRisco1 = this.getView().byId("PotencialRisco1").getSelectedKey();
					CodigoAtivador1 = this.getView().byId("CodigoAtivador1").getSelectedKey();

					if (PotencialRisco1 === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("magPotencialRiscoObrigatorio");
						MessageBox.error(sMessage);
						return;
					} else if (CodigoAtivador1 === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgCodAtivadorObrigatorio");
						MessageBox.error(sMessage);
						return;
					}
				}

				if (EPIsCorretos === "N") {
					PotencialRisco2 = this.getView().byId("PotencialRisco2").getSelectedKey();
					CodigoAtivador2 = this.getView().byId("CodigoAtivador2").getSelectedKey();

					if (PotencialRisco2 === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("magPotencialRiscoObrigatorio");
						MessageBox.error(sMessage);
						return;
					} else if (CodigoAtivador2 === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgCodAtivadorObrigatorio");
						MessageBox.error(sMessage);
						return;
					}
				}

				if (FerramentasCorretas === "N") {
					PotencialRisco3 = this.getView().byId("PotencialRisco3").getSelectedKey();
					CodigoAtivador3 = this.getView().byId("CodigoAtivador3").getSelectedKey();

					if (PotencialRisco3 === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("magPotencialRiscoObrigatorio");
						MessageBox.error(sMessage);
						return;
					} else if (CodigoAtivador3 === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgCodAtivadorObrigatorio");
						MessageBox.error(sMessage);
						return;
					}
				}

				if (SeguindoNormas === "N") {
					PotencialRisco4 = this.getView().byId("PotencialRisco4").getSelectedKey();
					CodigoAtivador4 = this.getView().byId("CodigoAtivador4").getSelectedKey();

					if (PotencialRisco4 === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("magPotencialRiscoObrigatorio");
						MessageBox.error(sMessage);
						return;
					} else if (CodigoAtivador4 === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgCodAtivadorObrigatorio");
						MessageBox.error(sMessage);
						return;
					}
				}

				if (FoiTreinado === "N") {
					PotencialRisco5 = this.getView().byId("PotencialRisco5").getSelectedKey();
					CodigoAtivador5 = this.getView().byId("CodigoAtivador5").getSelectedKey();

					if (PotencialRisco5 === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("magPotencialRiscoObrigatorio");
						MessageBox.error(sMessage);
						return;
					} else if (CodigoAtivador5 === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgCodAtivadorObrigatorio");
						MessageBox.error(sMessage);
						return;
					}
				}

				if (CompromissoFirmado === "S") {
					DescricaoComprFirmado = this.getView().byId("DescricaoComprFirmado").getValue();

					if (DescricaoComprFirmado === "") {
						sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgDescComprFirmadoObrigatorio");
						MessageBox.error(sMessage);
						return;
					}
				}
			}

			if (ResponsavelPrincipal === "") {
				sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgResponsavelPrincipalObrigatorio");
				MessageBox.error(sMessage);
				return;
			}
			// Valida campo obrigatórios - Fim

			//Formata data para ABAP - Inicio
			Data = Data.toLocaleDateString();
			Data = Data.substr(6) + Data.substr(3, 2) + Data.substr(0, 2);
			//Formata data para ABAP - Fim

			// Confirmação para Salvar dados de abordagem
			sMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgConfirmaGravarDados");
			MessageBox.confirm(sMessage, {
				onClose: function(oAction) {
					if (oAction == "OK") {
						//Monta objeto de dados - Inicio
						var oAbordagem = {
							OBJID: AbordagemID,
							ZDATA: Data,
							ZLIFNR: EmpresaAbordada,
							ZWAID: AreaAbordada,
							ZLOCAL: LocalInstalacao,
							ZCLASSIF: Classificacao,
							ZDESCR: DescricaoAbordagem,
							ZACAO: AcaoImediata,
							ZEVENTO: Evento,
							ZBUKRS: CodEmpresaPrincial,
							DESCR_ZBUKRS: DescEmpresaPrincial,
							ZORGEH: UnidadeOrganizacionalPrincipal,
							DESCR_ZORGEH: DescUniOrganizacionalPrincipal,
							ZUNAME: ResponsavelPrincipal,
							ZDESVIO: HouveDesvio,
							ZTPABORD: TipoAbordagem,
							ZPESSOA_ABORD: PessoaAbordada,
							ZGRAURISCO: GrauRisco,
							ZUNAME1: Responsavel1,
							ZUNAME2: Responsavel2,
							ZUNAME3: Responsavel3,
							ZBUKRS1: CodEmpresa1,
							ZBUKRS2: CodEmpresa2,
							ZBUKRS3: CodEmpresa3,
							DESCR_ZBUKRS1: DescEmpresa1,
							DESCR_ZBUKRS2: DescEmpresa2,
							DESCR_ZBUKRS3: DescEmpresa3,
							ZORGEH1: UnidadeOrganizacional1,
							ZORGEH2: UnidadeOrganizacional2,
							ZORGEH3: UnidadeOrganizacional3,
							ZCOACH: MetodoCoach === "S" ? 'X' : "",
							ZTIP_EPI: TipoEPI,
							ZRISCO: Risco,
							ZEST_DESVIO: EstratificacaoDesvio,
							ZRISCO_IDENT: ControlouRisco === "S" ? 'X' : "",
							ZRISCO_IDENT_POT: PotencialRisco1,
							ZRISCO_IDENT_ATI: CodigoAtivador1,
							ZUTIL_EPIS: EPIsCorretos === "S" ? 'X' : "",
							ZUTIL_EPIS_POT: PotencialRisco2,
							ZUTIL_EPIS_ATI: CodigoAtivador2,
							ZUTIL_RECURSOS: FerramentasCorretas === "S" ? 'X' : "",
							ZUTIL_RECURSOS_POT: PotencialRisco3,
							ZUTIL_RECURSOS_ATI: CodigoAtivador3,
							ZUTIL_NORMAS: SeguindoNormas === "S" ? 'X' : "",
							ZUTIL_NORMAS_POT: PotencialRisco4,
							ZUTIL_NORMAS_ATI: CodigoAtivador4,
							ZTREIN_ATIV: FoiTreinado === "S" ? 'X' : "",
							ZTREIN_ATIV_POT: PotencialRisco5,
							ZTREIN_ATIV_ATI: CodigoAtivador5,
							ZICS: ICSValue,
							ZCOMPR_FIRMADO: CompromissoFirmado,
							ZVIOLACAO: HouveViolacao,
							ZREALIZACAO: InstanteAbordagem
						};

						if (oAbordagem.ZCOACH === "") {
							oAbordagem.ZRISCO_IDENT = "";
							oAbordagem.ZUTIL_EPIS = "";
							oAbordagem.ZUTIL_RECURSOS = "";
							oAbordagem.ZUTIL_NORMAS = "";
							oAbordagem.ZTREIN_ATIV = "";
							oAbordagem.ZCOMPR_FIRMADO = "";
						}

						//Monta objeto de dados - Fim
						this.onGravarAbordagem(oAbordagem);

					} else {
						return;
					}
				}.bind(this)
			});

		},

		limparTela: function() {
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var TipoAbordagem = this.getView().byId("TipoAbordagem");
			var MetodoCoach = this.getView().byId("MetodoCoach");
			var Data = this.getView().byId("Data");
			var EmpresaAbordada = this.getView().byId("EmpresaAbordada");
			var AreaAbordada = this.getView().byId("AreaAbordada");
			var PessoaAbordada = this.getView().byId("PessoaAbordada");
			var LocalInstalacao = this.getView().byId("LocalInstalacao");
			var HouveDesvio = this.getView().byId("HouveDesvio");
			var GrauRisco = this.getView().byId("GrauRisco");
			var Classificacao = this.getView().byId("Classificacao");
			var TipoEPI = this.getView().byId("TipoEPI");
			var EstratificacaoDesvio = this.getView().byId("EstratificacaoDesvio");
			var Risco = this.getView().byId("Risco");
			var DescricaoAbordagem = this.getView().byId("DescricaoAbordagem");
			var AcaoImediata = this.getView().byId("AcaoImediata");
			var Evento = this.getView().byId("Evento");
			var HouveViolacao = this.getView().byId("HouveViolacao");
			var InstanteAbordagem = this.getView().byId("InstanteAbordagem");
			var ControlouRisco = this.getView().byId("ControlouRisco");
			var PotencialRisco1 = this.getView().byId("PotencialRisco1");
			var CodigoAtivador1 = this.getView().byId("CodigoAtivador1");
			var EPIsCorretos = this.getView().byId("EPIsCorretos");
			var PotencialRisco2 = this.getView().byId("PotencialRisco2");
			var CodigoAtivador2 = this.getView().byId("CodigoAtivador2");
			var FerramentasCorretas = this.getView().byId("FerramentasCorretas");
			var PotencialRisco3 = this.getView().byId("PotencialRisco3");
			var CodigoAtivador3 = this.getView().byId("CodigoAtivador3");
			var SeguindoNormas = this.getView().byId("SeguindoNormas");
			var PotencialRisco4 = this.getView().byId("PotencialRisco4");
			var CodigoAtivador4 = this.getView().byId("CodigoAtivador4");
			var FoiTreinado = this.getView().byId("FoiTreinado");
			var PotencialRisco5 = this.getView().byId("PotencialRisco5");
			var CodigoAtivador5 = this.getView().byId("CodigoAtivador5");
			var ICSVal = this.getView().byId("ICSVal");
			var CompromissoFirmado = this.getView().byId("CompromissoFirmado");
			var DescricaoComprFirmado = this.getView().byId("DescricaoComprFirmado");

			this.getView().byId("iconTabResponsavel").setSelectedKey("RespPrincipalFragment");

			for (var i = 1; i <= 3; i++) {
				oViewmodel.setProperty("/Responsavel" + i + "/MATRICULA", "");
				oViewmodel.setProperty("/Responsavel" + i + "/NOME", "");
				oViewmodel.setProperty("/Responsavel" + i + "/NOME_EMPRESA_LONGO", "");
				oViewmodel.setProperty("/Responsavel" + i + "/UNIDADE_ORGANIZACIONAL", "");
				oViewmodel.setProperty("/Responsavel" + i + "/DESC_UNIDADE_ORG", "");
				oViewmodel.setProperty("/Responsavel" + i + "/COD_EMPRESA", "");
				oViewmodel.setProperty("/Responsavel" + i + "/DESC_EMPRESA", "");
			}

			TipoAbordagem.setSelectedKey("");
			MetodoCoach.setSelectedKey("N");
			Data.setValue("");
			EmpresaAbordada.setSelectedKey("");
			AreaAbordada.setSelectedKey("");
			PessoaAbordada.setSelectedKey("");
			LocalInstalacao.setSelectedKey("");
			HouveDesvio.setSelectedKey("");
			GrauRisco.setSelectedKey("");
			Classificacao.setSelectedKey("");
			TipoEPI.setSelectedKey("");
			EstratificacaoDesvio.setSelectedKey("");
			Risco.setSelectedKey("");
			DescricaoAbordagem.setValue("");
			AcaoImediata.setValue("");
			Evento.setSelectedKey("");
			HouveViolacao.setSelectedKey("");
			InstanteAbordagem.setSelectedKey("");
			ControlouRisco.setSelectedKey("S");
			PotencialRisco1.setSelectedKey("");
			CodigoAtivador1.setSelectedKey("");
			EPIsCorretos.setSelectedKey("S");
			PotencialRisco2.setSelectedKey("");
			CodigoAtivador2.setSelectedKey("");
			FerramentasCorretas.setSelectedKey("S");
			PotencialRisco3.setSelectedKey("");
			CodigoAtivador3.setSelectedKey("");
			SeguindoNormas.setSelectedKey("S");
			PotencialRisco4.setSelectedKey("");
			CodigoAtivador4.setSelectedKey("");
			FoiTreinado.setSelectedKey("S");
			PotencialRisco5.setSelectedKey("");
			CodigoAtivador5.setSelectedKey("");
			ICSVal.setValue(0);
			CompromissoFirmado.setSelectedKey("N");
			DescricaoComprFirmado.setValue("");

			oViewmodel.setProperty("/visiblePessoaAbordada", false);
			oViewmodel.setProperty("/visibleDefIndiceCompSeguro", false);
			oViewmodel.setProperty("/visibleGrauRisco", false);
			oViewmodel.setProperty("/visibleClassificacao", false);
			oViewmodel.setProperty("/visibleEstratfDesvio", false);
			oViewmodel.setProperty("/visibleRisco", false);
			oViewmodel.setProperty("/visibleDescricaoCompFirmado", false);
			oViewmodel.setProperty("/visibleTipoEPI", false);
			oViewmodel.setProperty("/visiblePotencialRisco1", false);
			oViewmodel.setProperty("/visibleCodAtivador1", false);
			oViewmodel.setProperty("/visiblePotencialRisco2", false);
			oViewmodel.setProperty("/visibleCodAtivador2", false);
			oViewmodel.setProperty("/visiblePotencialRisco3", false);
			oViewmodel.setProperty("/visibleCodAtivador3", false);
			oViewmodel.setProperty("/visiblePotencialRisco4", false);
			oViewmodel.setProperty("/visibleCodAtivador4", false);
			oViewmodel.setProperty("/visiblePotencialRisco5", false);
			oViewmodel.setProperty("/visibleCodAtivador5", false);
			oViewmodel.setProperty("/habilitarResp1", false);
			oViewmodel.setProperty("/habilitarResp2", false);
			oViewmodel.setProperty("/habilitarResp3", false);
		},

		onCalculaICS: function() {
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var iPotencialRisco = 0;
			var iRisco = 0;
			var iEpi = 0;
			var iRecurso = 0;
			var iNorma = 0;
			var iAtividade = 0;

			if (this.byId("ControlouRisco").getSelectedKey() === "N") {
				iPotencialRisco = this.byId("PotencialRisco1").getSelectedKey();

				switch (iPotencialRisco) {
					case "1":
						iRisco = 5;
						break;
					case "2":
						iRisco = 4;
						break;
					case "3":
						iRisco = 3;
						break;
				}
			}

			if (this.byId("EPIsCorretos").getSelectedKey() === "N") {
				iPotencialRisco = this.byId("PotencialRisco2").getSelectedKey();

				switch (iPotencialRisco) {
					case "1":
						iEpi = 5;
						break;
					case "2":
						iEpi = 4;
						break;
					case "3":
						iEpi = 3;
						break;
				}
			}

			if (this.byId("FerramentasCorretas").getSelectedKey() === "N") {
				iPotencialRisco = this.byId("PotencialRisco3").getSelectedKey();

				switch (iPotencialRisco) {
					case "1":
						iRecurso = 5;
						break;
					case "2":
						iRecurso = 4;
						break;
					case "3":
						iRecurso = 3;
						break;
				}
			}

			if (this.byId("SeguindoNormas").getSelectedKey() === "N") {
				iPotencialRisco = this.byId("PotencialRisco4").getSelectedKey();

				switch (iPotencialRisco) {
					case "1":
						iNorma = 5;
						break;
					case "2":
						iNorma = 4;
						break;
					case "3":
						iNorma = 3;
						break;
				}
			}

			if (this.byId("FoiTreinado").getSelectedKey() === "N") {
				iPotencialRisco = this.byId("PotencialRisco5").getSelectedKey();

				switch (iPotencialRisco) {
					case "1":
						iAtividade = 5;
						break;
					case "2":
						iAtividade = 4;
						break;
					case "3":
						iAtividade = 3;
						break;
				}
			}

			var iICS = 100 - ((20 * iRisco) + (20 * iEpi) + (20 * iRecurso) + (20 * iNorma) + (20 * iAtividade)) / 5.;

			oViewmodel.setProperty("/ics", iICS);

		},

		getDadosSelecoes: function() {
			var oModel = this.getOwnerComponent().getModel();
			var oViewmodel = this.getView().getModel("registrarAbordagem");
			var usuario = sap.ushell.Container.getService("UserInfo").getId();

			var sURL = "/GET_SELECOESSet(USUARIO='" + usuario + "')";

			sap.ui.core.BusyIndicator.show();
			oModel.read(sURL, {
				success: function(oData) {
					sap.ui.core.BusyIndicator.hide();

					if (oData.LISTA_CLASSIFICACAO) {
						var oListClassf = JSON.parse(oData.LISTA_CLASSIFICACAO);
						oViewmodel.setProperty("/ListaClassificacoes", oListClassf);
					}

					if (oData.LISTA_CODIGO_ATIVADOR) {
						var oListCodAtv = JSON.parse(oData.LISTA_CODIGO_ATIVADOR);
						oViewmodel.setProperty("/ListaCodAtivadores", oListCodAtv);
					}

					if (oData.LISTA_EVENTOS) {
						var oListEvt = JSON.parse(oData.LISTA_EVENTOS);
						oListEvt.unshift({
							VALUE: "",
							TEXT: ""
						});
						oViewmodel.setProperty("/ListaEventos", oListEvt);
					}

					if (oData.LISTA_GRAU_RISCO) {
						var oListGrausRisco = JSON.parse(oData.LISTA_GRAU_RISCO);
						oListGrausRisco.unshift({
							VALUE: "",
							TEXT: ""
						});
						oViewmodel.setProperty("/ListaGrausRisco", oListGrausRisco);
					}

					if (oData.LISTA_HOUVE_VIOLACAO) {
						var oListHouveViolacao = JSON.parse(oData.LISTA_HOUVE_VIOLACAO);
						oListHouveViolacao.unshift({
							DOMVALUE_L: "",
							DDTEXT: ""
						});
						oViewmodel.setProperty("/ListaHouveViolacao", oListHouveViolacao);
					}

					if (oData.LISTA_INSTANTE_ABORDAGEM) {
						var oListInsAbord = JSON.parse(oData.LISTA_INSTANTE_ABORDAGEM);
						oListInsAbord.unshift({
							DOMVALUE_L: "",
							DDTEXT: ""
						});
						oViewmodel.setProperty("/ListaInstanteAbord", oListInsAbord);
					}

					if (oData.LISTA_LOCAIS_INSTALACAO) {
						var oListLocaisInst = JSON.parse(oData.LISTA_LOCAIS_INSTALACAO);
						oViewmodel.setProperty("/ListaLocaisInst", oListLocaisInst);
					}

					if (oData.LISTA_RESPONSAVEL) {
						var oListResponsaveis = JSON.parse(oData.LISTA_RESPONSAVEL);
						oViewmodel.setProperty("/ListaResponsaveis", oListResponsaveis);
					}

					if (oData.LISTA_RISCOS) {
						var oListRiscos = JSON.parse(oData.LISTA_RISCOS);
						oViewmodel.setProperty("/ListaRiscos", oListRiscos);
					}

					if (oData.LIST_AREA_ABORDADA) {
						var oListAreaAbord = JSON.parse(oData.LIST_AREA_ABORDADA);
						oViewmodel.setProperty("/ListaAreaAbordada", oListAreaAbord);
					}

					if (oData.LIST_EMPRESA_ABORDADA) {
						var oListEmprAbord = JSON.parse(oData.LIST_EMPRESA_ABORDADA);
						oListEmprAbord.unshift({
							VALUE: "",
							TEXT: ""
						});
						oViewmodel.setProperty("/ListaEmprAbordada", oListEmprAbord);
					}

					if (oData.LIST_TIPO_ABORDAGEM) {
						var oListTipoAbord = JSON.parse(oData.LIST_TIPO_ABORDAGEM);
						oListTipoAbord.unshift({
							VALUE: "",
							TEXT: ""
						});
						oViewmodel.setProperty("/ListaTipoAbordagem", oListTipoAbord);
					}

					if (oData.LISTA_EPI) {
						var oListEPI = JSON.parse(oData.LISTA_EPI);
						oListEPI.unshift({
							VALUE: "",
							TEXT: ""
						});
						oViewmodel.setProperty("/ListaEPI", oListEPI);
					}

					if (oData.MATRICULA_RESPONSAVEL) {
						oViewmodel.setProperty("/ResponsavelPrincipal/MATRICULA", oData.MATRICULA_RESPONSAVEL);
					}

					if (oData.NOME_RESPONSAVEL) {
						oViewmodel.setProperty("/ResponsavelPrincipal/NOME", oData.NOME_RESPONSAVEL);
					}

					if (oData.UNIDADE_ORGANIZACIONAL) {
						oViewmodel.setProperty("/ResponsavelPrincipal/UNIDADE_ORGANIZACIONAL", oData.UNIDADE_ORGANIZACIONAL);
					}

					if (oData.DESC_UN_ORG) {
						oViewmodel.setProperty("/ResponsavelPrincipal/DESC_UNIDADE_ORG", oData.DESC_UN_ORG);
					}

					if (oData.NOME_EMPRESA_LONGO) {
						oViewmodel.setProperty("/ResponsavelPrincipal/NOME_EMPRESA_LONGO", oData.NOME_EMPRESA_LONGO);
					}

					if (oData.COD_EMRPESA) {
						oViewmodel.setProperty("/ResponsavelPrincipal/COD_EMPRESA", oData.COD_EMRPESA);
					}

					if (oData.DESC_EMPRESA) {
						oViewmodel.setProperty("/ResponsavelPrincipal/DESC_EMPRESA", oData.DESC_EMPRESA);
					}

				}.bind(this),
				error: function(oError) {
					sap.ui.core.BusyIndicator.hide();

				}.bind(this)
			});
		}
	});
});