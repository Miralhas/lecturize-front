import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLecturesQuery } from "@/lib/queries";
import { Lecture } from "@/types/lecture";
import Spinner from "./spinner";
import { PropsWithChildren } from "react";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

type LecturesDialogProps = {
  lecture: Lecture
}

const LecturesCarousel = () => {
  const { data: lectures, isLoading } = useLecturesQuery();

  if (isLoading) {
    return (
      <Layout>
        <Spinner><span className="text-lg text-muted-foreground text-center">Loading lectures...</span></Spinner>
      </Layout>
    )
  }

  return (
    <Layout>
      {!lectures || !lectures.length ? (
        <span className="text-lg text-muted-foreground self-center">There are no lectures yet...</span>
      ) : (
        <Carousel className="w-full max-w-72 md:max-w-sm" opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {lectures?.map(lecture => (
              <CarouselItem key={lecture.id}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <LectureDialog lecture={lecture} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </Layout>
  )
}

const LectureDialog = ({ lecture }: LecturesDialogProps) => {
  lecture.imageUrl = `${BASE_URL}/lectures/${lecture.id}/image`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img src={`${BASE_URL}/lectures/${lecture.id}/image`} onError={(e) => e.currentTarget.src = "/logo.svg"} className="w-full h-auto max-h-full shadow-lg dark:shadow-black/30 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{lecture.title}</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:gap-10 max-h-[340px]">
          <pre className="mt-2 md:w-[370px] rounded-md bg-slate-950 p-4 overflow-hidden">
            <ScrollArea className="h-72">
              <code className="text-white text-sm">{JSON.stringify(lecture, null, 2)}</code>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </pre>
          <div className="max-h-[340px]">
            <img src={lecture.imageUrl} onError={(e) => e.currentTarget.src = "/logo.svg"} className="w-full h-full max-h-full shadow-lg dark:shadow-black/30" />
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center h-[400px]">
      {children}
    </div>
  )
}

export default LecturesCarousel;
