import { fetchLectures, Lecture } from "@/apis/lectures-api";
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

import { useQuery } from "@tanstack/react-query";

type LecturesDialogProps = {
  lecture: Lecture
}

const LecturesCarousel = () => {
  const { data: lectures, isLoading, refetch } = useQuery({
    queryFn: fetchLectures,
    queryKey: ["lectures"],
  });

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
                    {/* <img src="/logo.svg" alt={lecture.title} className="max-w-full h-auto shadow-lg dark:shadow-black/30" /> */}
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
        <img src="/logo.svg" className="max-w-full h-auto shadow-lg dark:shadow-black/30 cursor-pointer" />
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
