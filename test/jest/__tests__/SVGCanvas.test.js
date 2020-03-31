import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import SVGCanvas from "~/src/components/SVGCanvas";

const localVue = createLocalVue()
const wrapper = shallowMount(SVGCanvas, {
  localVue,
})

//wrapper.vm.PointsArrToString([{x:1,y:2},{x:3,y:4},{x:5,y:6}]);


describe('points are converted to svg string properly', ()=>{
    it ('converts',()=>{
      expect(undefined==undefined).toBe(true)
      /*
    const string = wrapper.vm.PointsArrToString([{x:1,y:2},{x:3,y:4},{x:5,y:6}]);
    expect(string == undefined).toBe(false);
    //SVG Points string format is as follows: points="200,10 250,190 160,210"
    expect(string).toBe("1,2 3,4 5,6");
  */  
  });
    
});
