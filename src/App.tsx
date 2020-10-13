import React, {MouseEvent,useState, useEffect} from 'react';
import './App.css';
// import 'normalize.css'
import {Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import modulesData from './fixtures/modules.json'
import sectionsData from './fixtures/sections.json'

// service
import { http } from './util/http';

// Components
const UI = require('govesta-ui');



interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// interface Data {
//   country: object;
//   country_id: number;
//   description?: array;
//   featured_image_id: number;
//   id: number;
//   image: object;
//   latitude: null;
//   longitude: null;
//   name: string;
//   property_published_count: number;
//   slug: string;
//   state: object;
//   state_id: number;
//   status: number;
//   translations: array;
// }



function App() {

  const loadPopularCities = async () => {
    let response ;
    try {
      response = await http("https://api.govesta.co/api/v1/geo/popular?type=city&limit=10");
    } catch {
      response = [];
    } finally {
      setPopularCities(response.data);
    }
  }
  // modules + Settings
  const [currentModule, setCurrentModule] = useState<string>('');
  const [selectedModules, setSeletedModules] = useState<any>([]);

  const [currentSection, setCurrentSection] = useState<string>('');
  const [selectedSections, setSeletedSections] = useState<any>([]);
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
    setSeletedModules([...selectedModules, newModule])
  }

  const onDeleteModule = (id:any) => {
    setSeletedModules((prevSelectedModules:any) => {
      return (
        [...prevSelectedModules].filter((_, i) => i !== id.key)
      )
    })
  }


  const onSectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSection(event.currentTarget.value);
  }

  const selectSection = (event: MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const newSection:any = sectionsData.find((item) => item.name === currentSection)
    setSeletedSections([...selectedSections, newSection])
  }

  const onDeleteSection = (id:any) => {
    setSeletedModules((prevSelectedSections:any) => {
      return (
        [...prevSelectedSections].filter((_, i) => i !== id.key)
      )
    })
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
    setCurrentSection(sectionsData[0].name)
    loadPopularCities();
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
          <ListGroup>
              {selectedModules && selectedModules.map((module:any, key:number) =>{
              return (
                <ListGroup.Item key={key}>
                <Row>
                  <Col>{module.name}</Col>
                  <Col className="text-right">
                    <Button variant="primary" className="close" aria-label="Close" size="sm" onClick={() =>{onDeleteModule({key})}}>
                      <span aria-hidden="true">&times;</span>
                    </Button>
                  </Col>
                </Row>
                    {module.props &&  module.props.map((prop:any, i:number) => {
                      return (
                        <Row key={i}>
                          <Col>{prop.name}</Col>
                          <Col><Form.Control type={prop.type} placeholder="" defaultValue={prop.value} /></Col>
                        </Row>
                      )
                    })}
                <Row>
                  <Col className="text-right"><Button variant="primary" size="sm">Add</Button></Col>
                </Row>
                </ListGroup.Item>
              )
            })}
              </ListGroup>
              <Form.Group controlId="control-select" as={Row}>
                <Form.Label column sm="2">sections</Form.Label>
                <Col sm="8">
                <Form.Control as="select" onChange={onSectionChange}>
                    {sectionsData.map((section) => (
                        <option key={section.id} value={section.name}>{section.name}</option>
                    ))}
                </Form.Control>
                </Col>
                <Col sm="2">
                <Button onClick={selectSection}>add</Button>
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