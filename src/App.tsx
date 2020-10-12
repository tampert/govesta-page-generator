import React, {MouseEvent,useState, useEffect} from 'react';
import './App.css';
// import 'normalize.css'
import {Container, Row, Col, Form, Button } from 'react-bootstrap';
import modulesData from './fixtures/modules.json'


// service
import { http } from './util/http';

// Components
// import * as UI from 'govesta-ui';
const UI = require('govesta-ui');

// interface IModule {
//   id: string;
//   name: string;
//   props: any;
// }

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {

  // const loadPopularCities = async () => {
  //   let response ;
  //   try {
  //     response = await http<any[]>("https://api.govesta.co/api/v1/geo/popular?type=city&limit=10");
  //   } catch {
  //     response = [];
  //   } finally {
  //     console.log(response);
  //     setPopularCities(response.parsedBody.data);
  //   }
  // }
  // modules + Settings
  const [currentModule, setCurrentModule] = useState<string>('');
  const [selectedModules, setSeletedModules] = useState<any>([]);

   // API calls
  const [popularCities, setPopularCities] = useState<any>([
    {}, {}, {}, {}, {}
  ]);

  // Form events
  const onModuleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentModule(event.currentTarget.value);
  }

  const selectModule = (event: MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const newModule:any = modulesData.find((item) => item.name === currentModule)
    console.log(newModule)
    setSeletedModules([...selectedModules, newModule])
  }

  // const loadPopularCities = async () => {
  //   let popularCities;

  //   await fetch("https://api.govesta.co/api/v1/geo/popular?type=city&limit=10")
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       popularCities = result.data
  //       setPopularCities(popularCities);
  //     },
  //     (error) => {
  //       popularCities = [];
  //     }
  //   )
  // }


  // useEffects
  useEffect(()=>{
    console.log('use effect')
    // set currentModule
    setCurrentModule(modulesData[0].name)
    // loadPopularCities();
  },[])

  useEffect(()=>{
    console.log(popularCities)
  },[popularCities])

  return (
    <Container className="App" fluid>
      <Row><Col>page generator</Col></Row>
      <Row>
        <Col sm="4">
        <Form>
          <Form.Group controlId="control-select" as={Row}>
            <Form.Label column sm="2">modules</Form.Label>
            <Col sm="8">
            <Form.Control as="select" onChange={onModuleChange}>
                {modulesData.map((module) => (
                    <option key={module.id} value={module.name}>{module.name}</option>
                ))}
            </Form.Control>
            </Col>
            <Col sm="2">
             <Button onClick={selectModule}>add</Button>
            </Col>
          </Form.Group>
        </Form>
        </Col>
        <Col sm="8">
        the preview 
        <UI.BannerModule
          image={require('./banner.jpg')}
          bigText="page.home.banner.description"
          linkText="page.home.banner.button"
          linkAs={<a href="https://company.govesta.co" />}
          dark
        />
        </Col>
      </Row>
    </Container>
  );
}

export default App;