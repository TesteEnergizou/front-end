import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    empresas: [],
    novaEmpresa: {
      nomeCliente: '',
      senha: '',
      razaoSocial: '',
      cnpj: '',
      cep: '',
      endereco: '',
      numero: '',
      telefone: '',
      email: '',
    },
    cnpjConsulta: '',
    empresaEdit: {
      id: null,
      razaoSocial: '',
      cnpj: '',
      cep: '',
      endereco: '',
      numero: '',
      telefone: '',
      email: '',
    },
    viaCepData: {
      endereco: ''
    }
  };

  componentDidMount() {
    this.fetchEmpresas();
  }

  fetchEmpresas = () => {
    axios.get('http://localhost:3000/empresas')
      .then((response) => {
        this.setState({ empresas: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleInputChange = (event) => {
    this.setState({
      novaEmpresa: {
        ...this.state.novaEmpresa,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleConsultaChange = (event) => {
    this.setState({ cnpjConsulta: event.target.value });
  };

  handleEditChange = (event) => {
    this.setState({
      empresaEdit: {
        ...this.state.empresaEdit,
        [event.target.name]: event.target.value,
      },
    });
  };

  criarEmpresa = () => {
    axios.post('http://localhost:3000/empresas', this.state.novaEmpresa)
      .then(() => {
        this.fetchEmpresas();
        this.setState({
          novaEmpresa: {
            nomeCliente: '',
            senha: '',
            razaoSocial: '',
            cnpj: '',
            cep: '',
            endereco: '',
            numero: '',
            telefone: '',
            email: '',
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  consultarEmpresa = () => {
    axios.get(`http://localhost:3000/empresas/${this.state.cnpjConsulta}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  editarEmpresa = () => {
    axios.put(`http://localhost:3000/empresas/${this.state.empresaEdit.id}`, this.state.empresaEdit)
      .then(() => {
        this.fetchEmpresas();
        this.setState({
          empresaEdit: {
            id: null,
            razaoSocial: '',
            cnpj: '',
            cep: '',
            endereco: '',
            numero: '',
            telefone: '',
            email: '',
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  excluirEmpresa = (id) => {
    axios.delete(`http://localhost:3000/empresas/${id}`)
      .then(() => {
        this.fetchEmpresas();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Função para buscar endereço via CEP
  buscarEnderecoViaCep = (cep) => {
    axios.get(`http://localhost:3000/viacep/${cep}`)
      .then((response) => {
        this.setState({
          viaCepData: {
            endereco: response.data.endereco
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Função para preencher automaticamente o campo de endereço
  preencherEnderecoViaCep = () => {
    const { cep } = this.state.novaEmpresa;
    this.buscarEnderecoViaCep(cep);
  };

  render() {
    return (
      <div>
        <h1>Aplicativo de Gerenciamento de Empresas</h1>

        <h2>Criar uma nova empresa</h2>
        <input
          type="text"
          name="nomeCliente"
          placeholder="Nome do Cliente"
          value={this.state.novaEmpresa.nomeCliente}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={this.state.novaEmpresa.senha}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="razaoSocial"
          placeholder="Nome da empresa (Razão Social)"
          value={this.state.novaEmpresa.razaoSocial}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="cnpj"
          placeholder="CNPJ (XX.XXX.XXX/XXXX-XX)"
          value={this.state.novaEmpresa.cnpj}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="cep"
          placeholder="CEP (XXXXX-XXX)"
          value={this.state.novaEmpresa.cep}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço (XXXXX)"
          value={this.state.novaEmpresa.endereco}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="numero"
          placeholder="Número (XXX)"
          value={this.state.novaEmpresa.numero}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone (+ 55 (XX) XXXXX-XXXX)"
          value={this.state.novaEmpresa.telefone}
          onChange={this.handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.novaEmpresa.email}
          onChange={this.handleInputChange}
        />
        <button onClick={this.criarEmpresa}>Criar</button>

        <h2>Listar todas as empresas cadastradas</h2>
        <ul>
          {this.state.empresas.map((empresa) => (
            <li key={empresa.id}>
              {empresa.razaoSocial} - {empresa.endereco}
              <button onClick={() => this.excluirEmpresa(empresa.id)}>Excluir</button>
            </li>
          ))}
        </ul>

        <h2>Consultar uma empresa específica por CNPJ</h2>
        <input
          type="text"
          placeholder="CNPJ"
          value={this.state.cnpjConsulta}
          onChange={this.handleConsultaChange}
        />
        <button onClick={this.consultarEmpresa}>Consultar</button>

        <h2>Editar os dados de uma empresa</h2>
        <input
          type="text"
          name="id"
          placeholder="ID da Empresa"
          value={this.state.empresaEdit.id}
          onChange={this.handleEditChange}
        />
        <input
          type="text"
          name="razaoSocial"
          placeholder="Nova Razão Social"
          value={this.state.empresaEdit.razaoSocial}
          onChange={this.handleEditChange}
        />
        <input
          type="text"
          name="cnpj"
          placeholder="CNPJ (XX.XXX.XXX/XXXX-XX)"
          value={this.state.novaEmpresa.cnpj}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="cep"
          placeholder="CEP (XXXXX-XXX)"
          value={this.state.novaEmpresa.cep}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço (XXXXX)"
          value={this.state.novaEmpresa.endereco}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="numero"
          placeholder="Número (XXX)"
          value={this.state.novaEmpresa.numero}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone (+ 55 (XX) XXXXX-XXXX)"
          value={this.state.novaEmpresa.telefone}
          onChange={this.handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.novaEmpresa.email}
          onChange={this.handleInputChange}
        />
        <button onClick={this.editarEmpresa}>Editar</button>
      </div>
    );
  }
}

export default App;
