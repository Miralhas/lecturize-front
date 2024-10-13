import { Lecture } from "@/apis/lectures-api";
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
import { useLectureContext } from "@/contexts/lectures-context";
import { useEffect } from "react";
import FallbackImage from "../../public/logo.svg";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

type LecturesDialogProps = {
  lecture: Lecture
}

const LecturesCarousel = () => {
  const { useLecturesQuery } = useLectureContext();
  const { data: lectures, refetch } = useLecturesQuery();

  useEffect(() => {
    refetch();
  }, [])

  return (
    <div className="flex justify-center">
      <Carousel className="w-full max-w-44 md:max-w-sm" opts={{ align: "start", loop: true }}>
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
    </div>
  )
}

const LectureDialog = ({ lecture }: LecturesDialogProps) => {
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img src={`${BASE_URL}/lectures/${lecture.id}/image`} onError={(e) => e.currentTarget.src = FallbackImage} className="max-w-full h-auto shadow-lg dark:shadow-black/30 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{lecture.title}</DialogTitle>
          <DialogDescription>
            {lecture.description}
          </DialogDescription>
        </DialogHeader>
        


        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LecturesCarousel;
