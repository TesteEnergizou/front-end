import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    empresas: [],
    novaEmpresa: {
      nome: '',
      endereco: '',
      telefone: '',
    },
    cnpjConsulta: '',
    empresaEdit: {
      id: null,
      nome: '',
      endereco: '',
      telefone: '',
    },
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
          novaEmpresa: { nome: '', endereco: '', telefone: '' },
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
        this.setState({ empresaEdit: { id: null, nome: '', endereco: '', telefone: '' } });
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

  render() {
    return (
      <div>
        <h1>Aplicativo de Gerenciamento de Empresas</h1>

        <h2>Criar uma nova empresa</h2>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={this.state.novaEmpresa.nome}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={this.state.novaEmpresa.endereco}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={this.state.novaEmpresa.telefone}
          onChange={this.handleInputChange}
        />
        <button onClick={this.criarEmpresa}>Criar</button>

        <h2>Listar todas as empresas cadastradas</h2>
        <ul>
          {this.state.empresas.map((empresa) => (
            <li key={empresa.id}>
              {empresa.nome} - {empresa.endereco}
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
          name="nome"
          placeholder="Novo Nome"
          value={this.state.empresaEdit.nome}
          onChange={this.handleEditChange}
        />
        <input
          type="text"
          name="endereco"
          placeholder="Novo Endereço"
          value={this.state.empresaEdit.endereco}
          onChange={this.handleEditChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Novo Telefone"
          value={this.state.empresaEdit.telefone}
          onChange={this.handleEditChange}
        />
        <button onClick={this.editarEmpresa}>Editar</button>
      </div>
    );
  }
}

export default App;
