import React from 'react';
import { Card,Button } from 'mdbreact';
import "./Prescription.css"
import { withRouter } from "react-router-dom";
import api from "../../Api"

class Prescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meds: []
         };
        this.handleAdd = this.handleAdd.bind(this) ;
        this.handlePrescription = this.handlePrescription.bind(this) ;

    }


    handleAdd = () => {
        const medicamento = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            dosagem: this.state.dosagem,
            intervalo: this.state.intervalo,
            quantidade: this.state.quantidade,
            DataInicial: this.state.dataInicial,
            DataFinal:this.state.dataFinal,
            horario: null            
          }
          this.setState({
            meds: [...this.state.meds, medicamento]
          });
          this.myFormRef.reset();
      }

      handleRemove(med){
        var array = this.state.meds.filter(function(s) { return s !== med });
        this.setState({meds: array });
     }

     handlePrescription(){
        const diagnostico = {
            nomeDiagnostico: this.state.nomeDiagnostico,
            descricao: this.state.descricao
        }

        const medicamentos = this.state.meds;


        api.addConsulta(diagnostico,this.props.crm,this.props.cpf).then(res => {
            const consulta = res.data;
            console.log(medicamentos)
            console.log(this.props)
            api.saveMedicamentos(medicamentos,this.props.cpf,this.props.crm,consulta.id)


          });

       
        this.setState({meds: [] });
        //window.location.reload();
        
        
     }




    render() {
        return (
          <Card>
            <div className="container ">
            <div className="row">
                <div className="col-sm-12 ">
                <div className= "card-body"><legend align="center">{this.props.nome}</legend></div>
                            <div className="tab_container">
                                <input id="tab1" type="radio" name="tabs3" defaultChecked/>
                                <label id="tab" htmlFor="tab1"><i className="fa fa-code"></i><span>Diagnosticar</span></label>

                                <input id="tab2" type="radio" name="tabs3" />
                                <label id="tab" htmlFor="tab2"><i className="fa fa-pencil-square-o"></i><span>Prescrever Medicamentos</span></label>

                                <section id="content1" className="tab_content">
                                    <div className="col-sm-12 card-body">
                                        <div className="form-group">
                                            <label htmlFor="concept" className="control-label">Diagnostico</label>
                                            <div>
                                                <input type="text" className="form-control"
                                                    onChange={(value) => this.setState({nomeDiagnostico: value.target.value})}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description" className="control-label">Descrição</label>
                                            <div>
                                                <textarea className="form-control" type="textarea" id="message" rows="2"
                                                    onChange={(value) => this.setState({descricao: value.target.value})}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section id="content2" className="tab_content">
                                <div className="row">
                                <div className="col-sm-6">

                                        <div className="panel panel-default">
                                            <div className="panel-body form-horizontal">
                                            <form ref={(el) => this.myFormRef = el}>
                                                <div className="form-group">
                                                    <label htmlFor="concept" className="control-label">Medicamento</label>
                                                    <div>
                                                        <input type="text" className="form-control"
                                                            onChange={(value) => this.setState({nome: value.target.value})}/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description" className="control-label">Descrição</label>
                                                    <div>
                                                        <textarea className="form-control" type="textarea" id="message" rows="2"
                                                         onChange={(value) => this.setState({descricao: value.target.value})}></textarea>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="date" className="col-sm-5 control-label">Data Inicial</label>
                                                    <div className="col-sm-7">
                                                        <input type="date" className="form-control" id="date" name="date"
                                                         onChange={(value) => this.setState({dataInicial: value.target.value})}/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="date" className="col-sm-5 control-label">Data Final</label>
                                                    <div className="col-sm-7">
                                                        <input type="date" className="form-control" id="date" name="date"
                                                         onChange={(value) => this.setState({dataFinal: value.target.value})}/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="amount" className=" col-sm-5 control-label">Dosagem (mg)</label>
                                                    <div className="col-sm-5">
                                                        <input type="number" className="form-control" id="dose" name="dose"
                                                         onChange={(value) => this.setState({dosagem: value.target.value})}/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="amount" className=" col-sm-5 control-label">Quantidade</label>
                                                    <div className="col-sm-5">
                                                        <input type="number" className="form-control" id="amount" name="amount"
                                                         onChange={(value) => this.setState({quantidade: value.target.value})}/>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="amount" className=" col-sm-5 control-label">Intervalo (hora)</label>
                                                    <div className="col-sm-5">
                                                        <input type="number" className="form-control" id="interval" name="interval"
                                                         onChange={(value) => this.setState({intervalo: value.target.value})}/>
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <div className="col-sm-5 text-center">
                                                        <Button outline type="button" size="sm" className="btn btn-default preview-add-button"
                                                            onClick={this.handleAdd}>
                                                            <span  className="glyphicon glyphicon-plus"></span> Adicionar
                                                        </Button>
                                                    </div>

                                                </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="row">
                                            <div className="">
                                                <div className="table-responsive">
                                                    <table className="table preview-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Medicamento</th>
                                                                <th>Dose</th>
                                                                <th>Quantidade</th>
                                                                <th>Intervalo</th>
                                                                <th></th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        { this.state.meds.map((medicamento) =>
                                                            <tr key = {medicamento.nome}>
                                                                <th>{medicamento.nome}</th>
                                                                <th>{medicamento.dosagem}</th>
                                                                <th>{medicamento.quantidade}</th>
                                                                <th>{medicamento.intervalo}</th>
                                                                <th><button type="button" className="close" aria-label="Close"
                                                                        onClick={() => this.handleRemove(medicamento)}>
                                                                        <span aria-hidden="true">&times;</span>
                                                                        </button></th>

                                                                    </tr>
                                                        )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="col-xs-12">
                                            <Button size = "sm" onClick={() => this.handlePrescription()}>Receitar!</Button>
                                            </div>
                                        </div>

                                    </div>
                                    </div>

                                </section>

                            </div>
                        </div>


                    </div>
        </div>
        </Card>

        );
    }
}

export default withRouter(Prescription);
