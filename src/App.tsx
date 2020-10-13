import React, {MouseEvent,useState, useEffect} from 'react';
// import 'normalize.css'
import modulesData from './fixtures/modules.json';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// service
import { http } from './util/http';

// Components
// import * as UI from 'govesta-ui';
const UI = require('govesta-ui');


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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



function App() {
  const classes = useStyles();

  const loadPopularCities = async () => {
    let response ;
    try {
      response = await http("https://api.govesta.co/api/v1/geo/popular?type=city&limit=10");
    } catch {
      response = [];
    } finally {
      console.log(response.data);
      setPopularCities(response.data);
    }
  }
  // modules + Settings
  const [currentModule, setCurrentModule] = useState<string>('');
  const [selectedModules, setSeletedModules] = useState<any>([]);

   // API calls
  const [popularCities, setPopularCities] = useState<any>([
    {}, {}, {}, {}, {}
  ]);
  
  // Form events
  
  const onModuleChange = (event: any) => {
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
    setCurrentModule(modulesData[0].name+ "")
    loadPopularCities();
  },[])

  useEffect(()=>{
    console.log(popularCities)
  },[popularCities])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h3>page generator</h3>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Modules</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={onModuleChange}>
                {modulesData.map((module) => (
                        <option key={module.id} value={module.name}>{module.name}</option>
                    ))}
              </Select>
              <Button color="secondary" variant="contained" onClick={selectModule}>add</Button>
            </FormControl>
            {/* <ListGroup>
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
              })} */}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;