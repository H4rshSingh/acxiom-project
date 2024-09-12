// "use server";
// import { dbConnect } from "@/lib/mongoose";
// import Vendor from "@/lib/models/vendor.model";

// export async function GET(req) {
//   dbConnect();
//   try {
//     c
//     const category = req.query.get('category');
//     console.log(category);
//     const vendor = await Vendor.find({ category: category });
//     console.log(vendor);
//     return new Response(JSON.stringify(vendor), { status: 200 });
//   } catch(error) {
//     console.log(error)
//   }
// }
