/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
const { Package, Feature } = require('../../../Models/index');


exports.getAll = async (req, res) => {
  try {
    const packages = await Package.findAll({
      include: { 
        model: Feature,
        as: 'features' 
      }
    });

    //Success Response
    const data = await packages;
   //  console.log("Here")
   //  console.log(data);
    res.render('pages/employer/getAllpackages', {
      pageName: 'Packages',
      data
      // packages: [
      //  {
      //     id: 1,
      //     package_name: "Gold",
      //     description: "Yes, this is it, this is the one. Don't overthink it, just click subscribe",
      //     price: "50000",
      //     package_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //     created_at: null,
      //     updated_at: null,
      //     features: [
      //       {
      //          id: 1,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       },
      //       {
      //          id: 2,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       },
      //       {
      //          id: 3,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       }
      //    ]
      //  },
      //  {
      //     id: 1,
      //     package_name: "Gold",
      //     description: "Yes, this is it, this is the one. Don't overthink it, just click subscribe",
      //     price: "50000",
      //     package_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //     created_at: null,
      //     updated_at: null,
      //     features: [
      //       {
      //          id: 1,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       },
      //       {
      //          id: 2,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       },
      //       {
      //          id: 3,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       }
      //    ]
      //  },
      //  {
      //     id: 1,
      //     package_name: "Gold",
      //     description: "Yes, this is it, this is the one. Don't overthink it, just click subscribe",
      //     price: "50000",
      //     package_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //     created_at: null,
      //     updated_at: null,
      //     features: [
      //       {
      //          id: 1,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       },
      //       {
      //          id: 2,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       },
      //       {
      //          id: 3,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       }
      //    ]
      //  },
      //  {
      //     id: 1,
      //     package_name: "Gold",
      //     description: "Yes, this is it, this is the one. Don't overthink it, just click subscribe",
      //     price: "50000",
      //     package_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //     created_at: null,
      //     updated_at: null,
      //     features: [
      //       {
      //          id: 1,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       },
      //       {
      //          id: 2,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       },
      //       {
      //          id: 3,
      //          description: "Search from System verified Talents",
      //          feature_id: "f3d1afa6-7800-4dac-b32a-00bc0a8d32cd",
      //          created_at: null,
      //          updated_at: null,
      //       }
      //    ]
      //  },
      // ]
    })

  } catch (error) {
    req.flash( 'error', 'Something went wrong' )
    return res.redirect('back')
  }
};

exports.packageGet = async (req, res) => {
  try {
    const { package_id } = req.params;

    const query = await Package.findOne({
      where: {
        package_id,
      },
      include: {
        model: Feature,
        as: 'features'
      }
    });
    if (!query) {
      req.flash( 'error', 'Package Not Found' )
      return res.redirect('back')
    }

    //Success Response
    const data = await query;
    console.log(data.dataValues);
    res.render('pages/employer/package-detail', {
      pageName: `Package`,
      data
     
    })
  } catch (err) {
      req.flash( 'Error', 'Something went wrong' )
      return res.redirect('back')
  }
};

