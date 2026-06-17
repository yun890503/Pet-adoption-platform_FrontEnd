import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export default function AnimalCarousel({ images, name }) {
  const [active, setActive] = useState(0);
  const safeImages = images?.length
    ? images
    : ['https://placehold.co/900x650/fff8ea/6f451f?text=Warm+Paws'];

  const move = (step) => {
    setActive((current) => (current + step + safeImages.length) % safeImages.length);
  };

  return (
    <Box position="relative" h={{ base: '220px', lg: '210px' }} overflow="hidden">
      <Image
        src={safeImages[active]}
        alt={`${name} 照片 ${active + 1}`}
        w="100%"
        h="100%"
        objectFit="cover"
        transition="transform 0.35s ease"
        _groupHover={{ transform: 'scale(1.04)' }}
      />
      <IconButton
        aria-label="上一張照片"
        icon={<FaChevronLeft />}
        position="absolute"
        left={3}
        top="50%"
        transform="translateY(-50%)"
        size="sm"
        rounded="full"
        bg="rgba(255, 255, 255, 0.88)"
        color="warm.brown"
        onClick={(event) => {
          event.stopPropagation();
          move(-1);
        }}
      />
      <IconButton
        aria-label="下一張照片"
        icon={<FaChevronRight />}
        position="absolute"
        right={3}
        top="50%"
        transform="translateY(-50%)"
        size="sm"
        rounded="full"
        bg="rgba(255, 255, 255, 0.88)"
        color="warm.brown"
        onClick={(event) => {
          event.stopPropagation();
          move(1);
        }}
      />
      <Flex position="absolute" bottom={3} left="0" right="0" justify="center" gap={2}>
        {safeImages.map((image, index) => (
          <Box
            key={image}
            boxSize={index === active ? '9px' : '7px'}
            rounded="full"
            bg={index === active ? 'white' : 'rgba(255,255,255,0.58)'}
            border="1px solid"
            borderColor="whiteAlpha.700"
          />
        ))}
      </Flex>
    </Box>
  );
}
