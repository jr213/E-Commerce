const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try{
    let info = await Tag.findAll({
      include: [{model: Product}],
    })
    res.status(200).json(info);
  } catch(err){
    res.json(err)
  }
});

router.get('/:id', async (req, res) => {
  try{
    let info = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include:[{model: Product}]
    });
    if(!info){
      return res.status(404).json('error')
    }
    res.status(200).json(info);
  }catch(err){
    res.json(err);
  }
  
});

router.post('/', async (req, res) => {
  try{
    await Tag.create(req.body)
    res.status(200).json('created')
  }
  catch (err){
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    let info = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if(!info){
      return res.status(404).json('error');
    }
    res.status(200).json('updated')
  }catch(err){
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try{
    let info = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if(!info){
      return res.status(404).json('error')
    }
    res.status(200).json('deleted')
  } catch (err){
    res.json(err);
  }
});

module.exports = router;
