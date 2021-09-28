import { fileUpalod } from "../../helpers/fileUpload";
import cloudinary  from 'cloudinary'
cloudinary.config({ 
    cloud_name: 'ddljerwb4', 
    api_key: '971825915515571', 
    api_secret: 'cxjCRsHnLDEph4bDfIEerRMWIac',
    // secure: true
});

describe('Pruebas al helper fileUpload', () => {
    test('debe de cargar un archivo y retornar el URL', async () => {
        
        const response  = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await response.blob();

        const file =  new File([blob],'foto.jpg');

        const url = await fileUpalod(file);
        // console.log (url);
        expect ( typeof url ).toBe('string');

        // bORRAR IMAGEN
        const segmetns = url.split('/');
        // console.log(segmetns[7]);
        const imagenId = segmetns[segmetns.length -1 ].replace('.png','');
        cloudinary.v2.api.delete_resources(imagenId, {}, ()=>{
            // done();
        });

    });
    test('debe de retornar un null ', async () => {
        
        

        const file =  new File([],'foto.jpg');

        const url = await fileUpalod(file);
        expect (  url ).toBe(null);
    })
    
})
