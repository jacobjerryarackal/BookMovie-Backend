import TheaterModels from '../models/theater.js';

export const createTheater = async (req, res) => {
    try {
        const theaterData = new TheaterModels(req.body);
        const savedTheaterModels = await theaterData.save();
        res.status(200).json(savedTheaterModels);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};


export const fetchAllTheater = async (req, res)=>{
    try {

        const theaters = await TheaterModels.find();

        if(!theaters){
            return res.status(404).json({message : "Theater not Found."})
        }
        res.status(200).json(theaters);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}

export const fetchOneTheater = async (req, res) => {
    try {
        const theater = await TheaterModels.findById(req.params.id);
        if (theater == null) {
            return res.status(404).json({ message: 'Cannot find theater' });
        }
        res.json(theater);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const updateTheater = async (req, res)=>{
    try {

        const id = req.params.id;
        const theaterExist = await TheaterModels.findOne({_id:id})

        if (!theaterExist){
            return res.status(404).json({message : "Theater not found."})
        }

        const updateTheater = await TheaterModels.findByIdAndUpdate(id, req.body, {new : true});
        res.status(201).json(updateTheater);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}

export const deleteTheater = async (req, res)=>{
    try {
        
        const id = req.params.id;
        const theaterExist = await TheaterModels.findOne({_id:id})
        if(!theaterExist){
            return res.status(404).json({message : " Theater Not Found. "})
        }

        await TheaterModels.findByIdAndDelete(id);
        res.status(201).json({message : " Theater deleted Successfully."})
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}