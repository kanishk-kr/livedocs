import Image from "next/image";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";

const Home=async()=>{
  const clerkUser=await currentUser()
  if(!clerkUser) redirect('/sign-in')
  const roomDocuments=await getDocuments(clerkUser.emailAddresses[0].emailAddress)
  return (
    <div >
      <main className="home-container">
        <Header className="sticky left-0 top-0">
          <div className="flex items-center gap-2 lg:gap-4">
            Notification
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </div>
          

        </Header>
        {roomDocuments.data.length>0 ?(
          <div className="document-list-container">
            <div className="document-list-title">
              <h3 className="text-28-semibold">All Documents</h3>
              <AddDocumentBtn
                userId={clerkUser.id}
                email={clerkUser.emailAddresses[0].emailAddress}
              
              />
            </div>
            <ul className="document-ul">
              {
                roomDocuments.data.map(({id,metadata,createdAt})=>(
                  <li key={id} className="document-list-item">
                    <Link href={`/documents/${id}` } className="flex flex-1 items-center gap-4">
                      <div className="hidden rounded-md bg-dark-50 p-2 sm:block">
                        <Image 
                        src='/assets/icons/doc.svg'
                        alt="file"
                        width={40}
                        height={40}/>
                      </div>
                      <div className="space-y-1">
                        <p className="line-clam-1 text-lg">{metadata.title}</p>
                        <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                      </div>
                    </Link>
                  </li>

                ))
              }
            </ul>

          </div>
        ):(
          <div className="document-list-empty">
            <Image
            src='/assets/icons/doc.svg'
            alt="Document"
            width={40}
            height={40}/>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            
            />

          </div>
        )}
      </main>
    </div>
  );
}

export default Home
