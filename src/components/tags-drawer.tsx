import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTags, Tag } from "@/apis/tags-api";

type TagsDrawerProps = {
  selectedTags: Tag[];
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
}

const TagsDrawer = ({ selectedTags, setSelectedTags }: TagsDrawerProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  
  const { data: tags, isLoading } = useQuery({
    queryFn: fetchTags,
    queryKey: ["tags"],
  });

  const handleSelectedTags = (tag: Tag) => {
    const isAlreadySelected = selectedTags.includes(tag);
    const excludeTag = () => selectedTags.filter((selectedTag) => selectedTag.id !== tag.id);
    setSelectedTags(prev => isAlreadySelected ? excludeTag() : [...prev, tag]);
  }

  const filteredTags = showMore ? tags : tags?.slice(0, 10);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="lg" className="w-full">Lecture Tags</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>Lecture Tags</DrawerTitle>
            <div className="flex justify-between">
              <DrawerDescription>Select tags that match your lecture.</DrawerDescription>
              {tags && (
                <span className="font-thin text-sm">{selectedTags.length}/{tags?.length}</span>
              )}
            </div>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-row flex-wrap gap-4 justify-center">
              {filteredTags?.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <Button key={tag.id} variant={`${isSelected ? 'default': 'outline'}`} className="w-fit" onClick={() => handleSelectedTags(tag)}>
                    {tag.name}
                  </Button>
                )
              })}
            </div>
          </div>
          <DrawerFooter>
            <div className="my-4 w-full mx-auto max-w-sm">
              <Button variant="secondary" className="w-full" onClick={() => setShowMore(prev => !prev)}>
                {showMore ? "Show less tags" : "Show more tags"}
              </Button>
            </div>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}


export default TagsDrawer;
