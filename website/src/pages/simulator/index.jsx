import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';

import Hero from '../../components/Hero';

const Simulator = () => {
    const text1 = "Simulator";
    const text2 = "";
    return (
    <Box>
      <Hero heading={text1} caption={text2} />      
      <Container maxWidth="xl" component="main">
        <Typography variant="h6" align="justify" color="black" component="p" sx={{pb: 6, pt: 8, pl: 8}}>
          Recent advancements in reinforcement learning algorithms have
          opened doors for researchers to operate and optimize building energy management systems autonomously. However, the lack of an
          easily configurable building dynamical model and energy management task simulation and evaluation platform has arguably slowed
          the progress in developing advanced and dedicated reinforcement learning (RL) and control algorithms for building operation tasks.
          Here we propose “BEAR”, a physics-principled Building Environment for Control and Reinforcement Learning. The platform allows
          researchers to benchmark both model-based and model-free controllers using a broad collection of standard building models in
          Python without co-simulation using external building simulators.In this paper, we discuss the design of this platform and compare
          it with other existing building simulation frameworks. We demonstrate the compatibility and performance of BEAR with different
          controllers, including both model predictive control (MPC) and several state-of-the-art RL methods with two case studies. BEAR is
          available at https://anonymous.4open.science/r/BEAR-C5FD.

          Building is one of the major sources of global energy consumption. In 2021, residential and commercial buildings were responsible
          for around 39% of total U.S. energy consumption and 74% of total U.S. electricity consumption [ 11]. Consequently, research on the
          operation of building Heating Ventilation and Air Conditioning (HVAC) systems can lead to significant energy savings and carbon
          emission reduction. Many control methods have been developed to provide solutions for building HVAC control problems, including
          model predictive control, nonlinear adaptive control, and decentralized control [ 7 ][ 17]. However, most such approaches require
          detailed and exact building dynamics models, and an increase in the complexity of building dynamics would lead to significantly higher
          computational costs. As a result, reinforcement learning (RL) has gained tremendous interest for building control in modern days
          due to its model-free nature (see [8] for a recent review). One challenge of the building RL research is the lack of a bench-
          marking simulation environment for developing and evaluating different RL algorithms with realistic building models. Several re-
          cent works [1 , 6 , 15 , 18 , 20] have proposed simulation solutions to address such a problem. However, most of them adopted a co-
          simulation framework with a python interface for algorithm development and an outsourcing building simulator, like Energy-
          Plus [ 3] or Modelica [9]. For researchers who do not yet have detailed knowledge of such packages, it is hard to test with their own
          configurations and validate RL performance. BOPTESTS-Gym [1 ], Sinergym [6 ], and Gym-Eplus [20 ] rely on EnergyPlus or Mod-
          elica to perform simulation, and the BCVTB middleware [19] to communicate between simulators and the platform interface. Ener-
          gym [ 15 ] uses predefined building models and co-simulation with EnergyPlus. CityLearn [ 18] is almost self-contained that it uses
          pre-simulated data. However, CityLearn focuses on building-level control interacting with the grid, rather than zone-level detailed
          building simulation.
        </Typography>
      </Container>
    </Box>
    );
}

export default Simulator;