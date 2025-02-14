import sharp from "sharp";


export default async function handler(req: { method: string; body: { imageBuffer: any; }; }, res: { setHeader: (arg0: string, arg1: string) => void; send: (arg0: Buffer<ArrayBufferLike>) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
    if (req.method === 'POST') {
      const { imageBuffer } = req.body; // Assume the JPEG image is sent as a buffer
  
      try {
        const webpBuffer = await sharp(imageBuffer)
          .webp()
          .toBuffer();
  
        res.setHeader('Content-Type', 'image/webp');
        res.send(webpBuffer);
      } catch (error) {
        res.status(500).json({ error: 'Error converting image' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }