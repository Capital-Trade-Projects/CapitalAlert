import { NextResponse } from "next/server";
import { paginateListObjectsV2 } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2Client";
 
export async function GET() {
    try {
        const paginator = paginateListObjectsV2(
      {
        client: r2,
        pageSize: 1,
      },
      {
        Bucket: process.env.R2_BUCKET,
      }
    );
        const objects = []
        for await ( const page of paginator) {
            // console.log(page)
            objects.push(page.Contents.map((o) => o.Key));
<<<<<<< HEAD:app/api/files/router.js
        }
        objects.forEach((objectList, pageNum) => {console.log(
 
        `Page ${pageNum + 1}\n------\n${objectList.map((o) => `• ${o}`).join("\n")}\n`,
 
      );    
    });  
   
=======
        } 
    //     objects.forEach((objectList, pageNum) => {console.log(

    //     `Page ${pageNum + 1}\n------\n${objectList.map((o) => `• ${o}`).join("\n")}\n`,

    //   );    
    // });  
    
>>>>>>> e5e40b108c115a689f40c5a630c6f1f948417a98:app/api/files/route.js
        return NextResponse.json(paginator);
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}